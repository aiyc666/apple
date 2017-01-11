package com.meng.servlet;

import javax.servlet.*;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

/**
 * Created by meng on 2016/10/7.
 */
public class XUACompatibleFilter implements Filter {
    public void destroy() {
    }

    public void doFilter(ServletRequest req, ServletResponse resp, FilterChain chain) throws ServletException, IOException {
        String mod = req.getParameter("mod");
//        System.out.println(mod);
        HttpServletResponse response = (HttpServletResponse) resp;
        response.addHeader("X-UA-Compatible", "IE=" + mod);
        chain.doFilter(req, resp);
    }

    public void init(FilterConfig config) throws ServletException {

    }

}
