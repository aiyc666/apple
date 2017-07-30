<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%><%
//    response.setHeader("Content-Type", "text/plain");
//    response.setHeader("Content-Disposition", "attachment;filename=aaa.doc");
//    response.setHeader("refresh", "5;url=http://www.baidu.com");
//    response.setHeader("X-UA-Compatible", "IE=9");

//    跨域
//    response.setHeader("Access-Control-Allow-Origin", "http://localhost:8080");
//    response.setHeader("Access-Control-Allow-Origin", "*");

    String callback = request.getParameter("callback");
    System.out.println(callback);
    out.print(callback + "(123)");
%>
<%--
<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="utf-8"/>
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
</head>
<body>
<header>Welcome Apple !</header>

<h1>2</h1>
user: <input value="${param.user}">

</body>
</html>--%>
