package com.java.myh.cloud.controller;

import com.java.myh.cloud.common.utils.Result;
import com.java.myh.cloud.common.utils.datatable.DataTableEntity;
import com.java.myh.cloud.common.utils.datatable.DataTablesUtils;
import com.java.myh.cloud.common.utils.datatable.TableEntity;
import com.java.myh.cloud.core.entity.Notice;
import com.java.myh.cloud.core.entity.User;
import com.java.myh.cloud.core.entity.enumeration.AbstractStatusEntity;
import com.java.myh.cloud.service.NoticeService;
import com.java.myh.cloud.service.UserService;
import org.springframework.data.domain.Page;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;
import java.util.Date;

/**
 * @author 心安 QWQ
 * @date 2018/03/05 01:25
 */
@Controller
@RequestMapping("/admin")
public class AdminController extends BaseController {
    @Resource
    private UserService userService;
    @Resource
    private NoticeService noticeService;

    @RequestMapping("/index")
    public String index() {
        return "/admin/index";
    }

    @ResponseBody
    @PostMapping("/index/data")
    public DataTableEntity<User> indexData(
            @RequestParam(required = false, defaultValue = "") String username,
            @RequestParam(required = false) AbstractStatusEntity.Status status,
            @RequestParam(required = false) @DateTimeFormat(pattern = "yyyy-MM-dd HH:mm:ss") Date startDate,
            @RequestParam(required = false) @DateTimeFormat(pattern = "yyyy-MM-dd HH:mm:ss") Date endDate,
            TableEntity tableEntity) {
        Page<User> userPage = userService.findAllUserByCondition(
                username, status, startDate, endDate, DataTablesUtils.getPageable(tableEntity));
        return new DataTableEntity<>(userPage, tableEntity);
    }

    /**
     * 管理员个人资料
     */
    @GetMapping("/personal/profile")
    public String personalProfile() {
        model.addAttribute("user", userService.findById(getUser().getId()));
        return "/admin/profile";
    }

    /**
     * 登录记录页面
     */
    @GetMapping("/login/record")
    public String loginRecord() {
        return "/admin/adminLoginLog";
    }

    /**
     * 公告管理
     */
    @GetMapping("/notice/management")
    public String noticeManagement() {
        return "/admin/noticeManagement";
    }

    /**
     * 公告数据
     */
    @ResponseBody
    @PostMapping("/notice/data")
    public DataTableEntity noticeData(
            @RequestParam(required = false) String noticeName,
            @RequestParam(required = false) @DateTimeFormat(pattern = "yyyy-MM-dd HH:mm:ss") Date startDate,
            @RequestParam(required = false) @DateTimeFormat(pattern = "yyyy-MM-dd HH:mm:ss") Date endDate,
            TableEntity tableEntity
    ) {
        Page<Notice> noticePage = noticeService.getAllNoticeByCondition(noticeName, startDate, endDate, DataTablesUtils.getPageable(tableEntity));
        return new DataTableEntity<>(noticePage, tableEntity);
    }

    /**
     * 更新公告
     */
    @ResponseBody
    @PostMapping("/edit/notice")
    public Result editNotice(Integer id, String title, String content) {
        Notice notice = noticeService.findById(id);
        notice.setContent(content);
        notice.setNoticeName(title);
        noticeService.save(notice);
        return Result.ok();
    }

    /**
     * 发布新公告页面
     */
    @GetMapping("/new/notice/page")
    public String newNoticePage() {
        return "/admin/newNotice";
    }

    /**
     * 发布公告
     */
    @PostMapping("/add/notice")
    @ResponseBody
    public Result addNotice(String title, String content) {
        noticeService.addNotice(title, content, getUser());
        return Result.ok();
    }

    /**
     * 删除公告
     */
    @ResponseBody
    @PostMapping("/delete/notice")
    public Result deleteNotice(Integer id) {
        Notice notice = noticeService.findById(id);
        notice.setIsDelete(Notice.Whether.YES);
        noticeService.save(notice);
        return Result.ok();
    }

    /**
     * 取消删除
     */
    @ResponseBody
    @PostMapping("cancel/delete")
    public Result cancelDelete(Integer id) {
        Notice notice = noticeService.findById(id);
        notice.setIsDelete(Notice.Whether.NO);
        noticeService.save(notice);
        return Result.ok();
    }

    /**
     * 冻结用户
     */
    @ResponseBody
    @PostMapping("/freeze/user")
    public Result freezeUser(@RequestParam("userIds[]") Integer[] userIds) {
        userService.changeUserStatusByUserIds(userIds, User.Status.Disabled);
        return Result.ok();
    }

    /**
     * 解冻用户
     */
    @ResponseBody
    @PostMapping("/unfreeze/user")
    public Result unfreezeUser(@RequestParam("userIds[]") Integer[] userIds) {
        userService.changeUserStatusByUserIds(userIds, AbstractStatusEntity.Status.Normal);
        return Result.ok();
    }

    /**
     * 发布公告
     */
    @ResponseBody
    @PostMapping("/publish/notice")
    public Result publishNotice(String title, String content) {
        Notice notice = new Notice();
        notice.setUser(getUser());
        notice.setIsDelete(Notice.Whether.NO);
        notice.setCreateDate(new Date());
        notice.setNoticeName(title);
        notice.setContent(content);
        noticeService.save(notice);
        return Result.ok();
    }
}
