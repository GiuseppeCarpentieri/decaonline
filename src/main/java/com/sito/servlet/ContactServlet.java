package com.sito.servlet;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.regex.Pattern;

@WebServlet(name = "ContactServlet", urlPatterns = {"/contact"})
public class ContactServlet extends HttpServlet {
    
    private static final String EMAIL_PATTERN = "^[A-Za-z0-9+_.-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,}$";
    private Pattern pattern = Pattern.compile(EMAIL_PATTERN);
    
    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) 
            throws ServletException, IOException {
        
        String name = request.getParameter("name");
        String email = request.getParameter("email");
        String message = request.getParameter("message");
        
        boolean isValid = true;
        String errorMessage = "";
        
        if (name == null || name.trim().isEmpty()) {
            isValid = false;
            errorMessage = "Il nome è obbligatorio.";
        } else if (email == null || email.trim().isEmpty() || !pattern.matcher(email).matches()) {
            isValid = false;
            errorMessage = "Inserisci un'email valida.";
        } else if (message == null || message.trim().isEmpty() || message.length() < 10) {
            isValid = false;
            errorMessage = "Il messaggio deve contenere almeno 10 caratteri.";
        }
        
        response.setContentType("text/html;charset=UTF-8");
        PrintWriter out = response.getWriter();
        
        out.println("<!DOCTYPE html>");
        out.println("<html lang=\"it\"><head>");
        out.println("<meta charset=\"UTF-8\">");
        out.println("<title>" + (isValid ? "Messaggio Inviato" : "Errore") + "</title>");
        out.println("<link rel=\"stylesheet\" href=\"css/style.css\">");
        out.println("</head><body>");
        out.println("<div class=\"container\" style=\"padding: 100px 0; text-align: center;\">");
        
        if (isValid) {
            out.println("<h1 style=\"color: var(--primary-color);\">✓ Grazie " + escapeHtml(name) + "!</h1>");
            out.println("<p>Il tuo messaggio è stato ricevuto con successo.</p>");
            out.println("<p>Ti risponderemo all'indirizzo: <strong>" + escapeHtml(email) + "</strong></p>");
        } else {
            out.println("<h1 style=\"color: var(--accent-color);\">✗ Errore</h1>");
            out.println("<p style=\"color: var(--accent-color);\">" + errorMessage + "</p>");
        }
        
        out.println("<a href=\"index.html\" class=\"btn-primary\" style=\"margin-top: 2rem; display: inline-block;\">Torna alla Home</a>");
        out.println("</div>");
        out.println("</body></html>");
    }
    
    private String escapeHtml(String text) {
        if (text == null) return "";
        return text.replace("&", "&amp;")
                  .replace("<", "&lt;")
                  .replace(">", "&gt;")
                  .replace("\"", "&quot;")
                  .replace("'", "&#39;");
    }
}
