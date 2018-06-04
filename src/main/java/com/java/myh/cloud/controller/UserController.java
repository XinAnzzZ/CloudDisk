package com.java.myh.cloud.controller;

import com.java.myh.cloud.common.data.PayWebConfig;
import com.java.myh.cloud.common.utils.FilesUtils;
import com.java.myh.cloud.common.utils.MailUtils;
import com.java.myh.cloud.common.utils.PasswordHelper;
import com.java.myh.cloud.common.utils.Result;
import com.java.myh.cloud.common.utils.datatable.DataTableEntity;
import com.java.myh.cloud.common.utils.datatable.DataTablesUtils;
import com.java.myh.cloud.common.utils.datatable.TableEntity;
import com.java.myh.cloud.common.utils.img.VerifyCodeUtils;
import com.java.myh.cloud.common.utils.string.StringUtils;
import com.java.myh.cloud.core.entity.*;
import com.java.myh.cloud.service.*;
import org.springframework.data.domain.Page;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.annotation.Resource;
import javax.mail.MessagingException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.*;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * @author 心安 QWQ
 */
@Controller
@RequestMapping("/user")
public class UserController extends BaseController {
    @Resource
    private UserService userService;
    @Resource
    private FilesService filesService;
    @Resource
    private LoginLogService loginLogService;
    @Resource
    private NoticeService noticeService;
    @Resource
    private SafetyService safetyService;
    @Resource
    private ShareFilesService shareFilesService;

    /**
     * 跳转到注册页面
     */
    @RequestMapping("/register/page")
    public String registerPage() {
        return "login/register";
    }

    /**
     * 用户注册
     * userService.registerUser(username, password, email);
     */
    @ResponseBody
    @PostMapping("/register")
    public Result register(
            String username, String email,
            String password, String validateCode, HttpServletRequest request) {
        if (StringUtils.isEmpty(username) || StringUtils.isEmpty(email) || StringUtils.isEmpty(password)) {
            return Result.fail("用户名、密码或邮箱不能为空！");
        }
        if (!PayWebConfig.getIsDev()) {
            if (org.apache.commons.lang3.StringUtils.isEmpty(validateCode)) {
                return Result.fail("请输入验证码！");
            } else {
                String randCode;
                try {
                    randCode = request.getSession().getAttribute(VerifyCodeUtils.RANDOM_CODE_KEY).toString();
                } catch (Exception e) {
                    return Result.fail("验证码错误！");
                }

                if (!validateCode.equalsIgnoreCase(randCode)) {
                    return Result.fail("验证码错误！");
                }
            }
        }
        if (userService.findByUserName(username) != null) {
            return Result.fail("用户名已存在");
        }
        return Result.fail();
//        return Result.ok("注册成功，即将跳转至登录页面").setData("/login");
    }

    /**
     * 首页
     * inspection
     */
    @RequestMapping("/home")
    public String home() {
        return "/user/home";
    }

    /**
     * 首页数据
     */
    @ResponseBody
    @PostMapping("/home/data")
    public DataTableEntity<FilesDO> getAllFiles(
            TableEntity tableEntity,
            @RequestParam(required = false, defaultValue = "0") Integer fatherId,
            @RequestParam(required = false, defaultValue = "") String searchContent
    ) {
        Page<FilesDO> allFiles = filesService.findAllFiles(
                getUser(), fatherId, searchContent, DataTablesUtils.getPageable(tableEntity));
        return new DataTableEntity<>(allFiles, tableEntity);
    }

    /**
     * 上传页面
     */
    @RequestMapping("/upload/page")
    public String toUploadPage(
            @RequestParam(required = false, defaultValue = "0") Integer fatherId,
            HttpSession session
    ) {
        session.setAttribute("fatherId", fatherId);
        return "user/file/upload";
    }

    /**
     * 文件上传处理器
     */
    @ResponseBody
    @PostMapping("/upload")
    public Result upload(MultipartFile file, HttpSession session) {
        User user = userService.findById(getUser().getId());
        //检查用户的剩余空间是否足够
        if (!userService.checkUserCapacity(user, file.getSize())) {
            return Result.fail("对不起，您的可用空间不足！");
        }
        Integer fatherId = session.getAttribute("fatherId") == null ? 0 :
                (Integer) session.getAttribute("fatherId");
        try {
            String fileLocation = FilesUtils.saveFile(file);
            String filename = file.getOriginalFilename();
            FilesDO filesDO = new FilesDO();
            filesDO.setUser(getUser());
            filesDO.setFatherId(fatherId);
            filesDO.setFileName(FilesUtils.getFileName(filesService, user.getId(), fatherId, FilesDO.Whether.NO, filename));
            filesDO.setExtensionName(filename.substring(filename.lastIndexOf(".") + 1));
            filesDO.setCreateDate(new Date());
            filesDO.setModifyDate(new Date());
            //别问我为什么非要加个B，我也不知道为什么当初设计的时候怎么自己是个脑残
            filesDO.setFileSize(file.getSize() + "B");
            filesDO.setType(FilesUtils.getFileType(file));
            filesDO.setIsDelete(FilesDO.Whether.NO);
            filesDO.setLocation(fileLocation);
            filesDO.setIsFolder(FilesDO.Whether.NO);
            filesService.save(filesDO);
            userService.changeCapacityWhenUpload(user.getId(), file.getSize());
        } catch (IOException e) {
            return Result.fail();
        }
        return Result.ok("上传成功！");
    }

    /**
     * 得到父目录的id，首页中返回上一级按钮的控制器
     */
    @PostMapping("/get/upper/folder/id")
    @ResponseBody
    public Result getUpperFolderId(Integer sonId) {
        FilesDO filesDO = filesService.findFileById(sonId);
        Result result = new Result();
        result.setData(filesDO.getFatherId());
        return result;
    }

    /**
     * 跳转到新建文件夹页面
     */
    @RequestMapping("/new/folder/page")
    public String toNewFolderPage(@RequestParam(required = false, defaultValue = "0") Integer fatherId) {
        model.addAttribute("fatherId", fatherId);
        return "user/file/newFolder";
    }

    /**
     * 新建文件夹处理
     */
    @PostMapping("/new/folder")
    @ResponseBody
    public Result newFolder(String folderName, Integer fatherId) {
        FilesDO filesDO = new FilesDO();
        filesDO.setUser(getUser());
        filesDO.setFatherId(fatherId);
        folderName = FilesUtils.getFileName(filesService, getUser().getId(), fatherId, FilesDO.Whether.YES, folderName);
        filesDO.setFileName(folderName);
        filesDO.setModifyDate(new Date());
        filesDO.setCreateDate(new Date());
        filesDO.setType(FilesDO.FileTypeEnum.Folder);
        filesDO.setIsFolder(FilesDO.Whether.YES);
        filesDO.setIsDelete(FilesDO.Whether.NO);
        filesDO.setFileSize("-");
        filesService.save(filesDO);
        return Result.ok();
    }

    /**
     * 检查用户点击下载的是否是文件夹
     */
    @ResponseBody
    @RequestMapping("/check/file/is/folder")
    public Result checkFileIsFolder(Integer fileId) {
        FilesDO file = filesService.findFileById(fileId);
        if (file.getIsFolder() == FilesDO.Whether.YES) {
            return Result.fail();
        } else {
            return Result.ok();
        }
    }

    /**
     * 文件下载控制器
     */
    @ResponseBody
    @RequestMapping("/file/download")
    public void fileDownload(Integer fileId, HttpServletResponse response) throws Exception {
        FilesDO filesDO = filesService.findById(fileId);
        String filePath = filesDO.getLocation();
        File file = new File(filePath);
        InputStream fileInputStream = new BufferedInputStream(new FileInputStream(file));
        response.reset();
        //设置响应头
        response.setContentType("application/x-download");
        //设置响应头
        response.addHeader("Content-Disposition", "attachment;filename=" +
                new String(filesDO.getFileName()
                        .getBytes("UTF-8"), "iso-8859-1"));
        response.addHeader("Content-Length", "" + file.length());
        OutputStream outputStream = new BufferedOutputStream(response.getOutputStream());
        //application/octet-stream ： 二进制流数据（最常见的文件下载）。
        response.setContentType(MediaType.APPLICATION_OCTET_STREAM.toString());
        byte[] buffer = new byte[1024 * 1024 * 4];
        int i;
        while ((i = fileInputStream.read(buffer)) != -1) {
            outputStream.write(buffer, 0, i);
        }
        fileInputStream.close();
        outputStream.flush();
        outputStream.close();
        response.wait();
    }

    /**
     * 文件删除
     */
    @ResponseBody
    @RequestMapping("/delete/file")
    public Result deleteFile(@RequestParam("fileId[]") Integer[] filesId) {
        try {
            User user = getUser();
            for (Integer fileId : filesId) {
                filesService.deleteFilesByFilesId(fileId, userService, user);
            }
            return Result.ok();
        } catch (Exception e) {
            return Result.fail();
        }
    }

    /**
     * 登录记录
     */
    @GetMapping("/login/record")
    public String loginRecord() {
        return "user/personal/loginRecord";
    }

    /**
     * 登录记录数据
     */
    @ResponseBody
    @PostMapping("/login/record/data")
    public DataTableEntity<LoginLog> loginRecordData(
            @RequestParam(required = false)
            @DateTimeFormat(pattern = "yyyy-MM-dd HH:mm:ss") Date loginDateStart,
            @RequestParam(required = false)
            @DateTimeFormat(pattern = "yyyy-MM-dd HH:mm:ss") Date loginDateEnd,
            TableEntity tableEntity
    ) {
        Page<LoginLog> allLoginLog = loginLogService.findAllLoginLog(
                getUser(), loginDateStart, loginDateEnd, DataTablesUtils.getPageable(tableEntity));
        return new DataTableEntity<>(allLoginLog, tableEntity);
    }

    /**
     * 个人资料
     */
    @GetMapping("/personal/profile")
    public String personalProfile() {
        User user = userService.findByUserName(getUser().getUsername());
        String percentage = FilesUtils.getCapacityPercentage(
                user.getUsedCapacity(), user.getTotalCapacity());
        model.addAttribute("percentage", percentage);
        model.addAttribute("user", user);
        return "user/personal/personalProfile";
    }

    /**
     * 公告页面
     */
    @GetMapping("/to/notice/page")
    public String toNoticePage() {
        return "/user/notice";
    }

    /**
     * 公告页面数据
     */
    @ResponseBody
    @PostMapping("/notice/data")
    public DataTableEntity<Notice> noticeData(
            String noticeName,
            @RequestParam(required = false)
            @DateTimeFormat(pattern = "yyyy-MM-dd HH:mm:ss") Date startDate,
            @RequestParam(required = false)
            @DateTimeFormat(pattern = "yyyy-MM-dd HH:mm:ss") Date endDate,
            TableEntity tableEntity
    ) {
        Page<Notice> allNoticeByCondition = noticeService.getNotDeleteNoticeByCondition(
                noticeName, startDate, endDate, DataTablesUtils.getPageable(tableEntity));
        return new DataTableEntity<>(allNoticeByCondition, tableEntity);
    }

    /**
     * 公告详情页面
     */
    @GetMapping("/notice/content/page")
    public String noticeContentPage(Integer noticeId) {
        model.addAttribute("notice", noticeService.findById(noticeId));
        if (getUser().getUserType() == User.UserType.ADMIN) {
            return "/admin/editNotice";
        }
        return "/user/noticeContent";
    }

    /**
     * 安全中心
     */
    @GetMapping("/safety/page")
    public String safetyPage() {
        return "user/personal/safety";
    }

    /**
     * 修改密码页面
     */
    @RequestMapping("/change/password/page")
    public String changePasswordPage() {
        return "user/personal/changePassword";
    }

    /**
     * 密码校验
     */
    @ResponseBody
    @PostMapping("/check/password")
    public Result checkPassword(String username, String oldPassword) {
        boolean flag = userService.checkPassword(username, oldPassword);
        Result result = new Result();
        result.setSuccess(flag);
        return result;
    }

    /**
     * 密保问题校验
     */
    @ResponseBody
    @PostMapping("/validate/question")
    public Result validateQuestion(String answer, String question) {
        boolean b = safetyService.checkSecurityQuestion(getUser(), question, answer);
        Result result = new Result();
        result.setSuccess(b);
        return result;
    }

    /**
     * 修改密码
     */
    @ResponseBody
    @PostMapping("/reset/password")
    public Result resetPassword(String password) {
        User user = userService.findByUserName(getUser().getUsername());
        user.setPassword(PasswordHelper.encodePassword(password));
        userService.save(user);
        return Result.ok();
    }

    /**
     * 邮箱校验页面
     */
    @GetMapping("/validate/email/page")
    public String validateEmailPage() {
        model.addAttribute("user", getUser());
        return "user/personal/validateEmail";
    }

    /**
     * 发送验证码
     */
    @ResponseBody
    @PostMapping("/send/email")
    public Result sendEmail(HttpSession session, String email) throws MessagingException {
        if (!getUser().getEmail().equals(email)) {
            return Result.fail();
        }
        String randomCode = VerifyCodeUtils.generateVerifyCode(4);
        session.setAttribute("randomCode", randomCode);
        MailUtils.sendEmail(email, randomCode);
        return Result.ok();
    }

    /**
     * 校验邮箱验证码
     */
    @ResponseBody
    @PostMapping("/check/random/code")
    public Result checkRandomCode(String randomCode, HttpSession session) {
        String code = (String) session.getAttribute("randomCode");
        if (code.equals(randomCode)) {
            session.setAttribute("flag", "flag");
            return Result.ok();
        }
        return Result.fail();
    }

    /**
     * 检查是否通过邮箱验证
     */
    @RequestMapping("/check/validate")
    @ResponseBody
    public Result checkValidate(HttpSession session) {
        Object flag = session.getAttribute("flag");
        if (flag != null) {
            return Result.ok();
        }
        return Result.fail();
    }

    /**
     * 修改密保页面
     */
    @RequestMapping("/modify/security/question/page")
    public String modifySecurityQuestionPage() {
        List<Safety> safetyList = safetyService.findByUserId(getUser());
        Map<String, Safety> map = new HashMap<>(16);
        Integer i = 1;
        for (Safety item : safetyList) {
            map.put(i.toString(), item);
            i++;
        }
        model.addAttribute("map", map);
        return "user/personal/modifySecurityQuestion";
    }

    /**
     * 修改密保
     */
    @ResponseBody
    @PostMapping("/modify/security/question")
    public Result modifySecurityQuestion(
            String questionOne,
            String answerOne,
            String questionTwo,
            String answerTwo,
            String questionThree,
            String answerThree
    ) {
        Safety safety1 = new Safety();
        safety1.setQuestion(questionOne);
        safety1.setAnswer(PasswordHelper.encodePassword(answerOne));
        Safety safety2 = new Safety();
        safety2.setQuestion(questionTwo);
        safety2.setAnswer(PasswordHelper.encodePassword(answerTwo));
        Safety safety3 = new Safety();
        safety3.setQuestion(questionThree);
        safety3.setAnswer(PasswordHelper.encodePassword(answerThree));
        Safety[] arr = {safety1, safety2, safety3};
        safetyService.saveAllSecurityQuestion(arr);
        return Result.ok();
    }

    /**
     * 玩一下
     */
    @GetMapping("/just/play")
    public String justPlay() {
        return "/user/justPlay";
    }

    /**
     * 文件分享用户登录页面
     */
    @GetMapping("/login/page")
    public String userLoginPage() {
        return "/user/share/login";
    }

    @ResponseBody
    @PostMapping("/save/file")
    public Result saveFile(Integer id) {
        FilesDO filesDO = shareFilesService.findById(id).getFilesDO();
        if (filesDO.getUser().getId().equals(getUser().getId())) {
            return Result.fail("这是您自己分享的文件，不能再次保存哦~");
        }
        FilesDO newFilesDO = new FilesDO();
        newFilesDO.setUser(getUser());
        newFilesDO.setModifyDate(new Date());
        newFilesDO.setCreateDate(new Date());
        newFilesDO.setFatherId(0);
        newFilesDO.setFileName(filesDO.getFileName());
        newFilesDO.setExtensionName(filesDO.getExtensionName());
        newFilesDO.setFileSize(filesDO.getFileSize());
        newFilesDO.setLocation(filesDO.getLocation());
        newFilesDO.setIsFolder(filesDO.getIsFolder());
        newFilesDO.setIsDelete(FilesDO.Whether.NO);
        newFilesDO.setType(filesDO.getType());
        filesService.save(newFilesDO);
        return Result.ok();
    }
}
