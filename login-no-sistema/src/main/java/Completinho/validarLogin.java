package Completinho;

import javax.swing.text.StyledEditorKit;

public class validarLogin {
    void espaco(){
        System.out.println();
    }

    void validarCadastro(String emailCadastro, String senhaCadastro) {
        if (emailCadastro.endsWith(".com") && senhaCadastro.length() <= 14) {
            System.out.println("-------------------------------------------------------");
            System.out.println("Cadastrado realizado com Sucesso!");
            System.out.println();
        }else {
            System.out.println("-------------------------------------------------------");
            System.out.println("Desculpe, mas seu email não termina com '.com' ou sua senha tem mais de 14 caracteres");
        }
    }

    Boolean validado(String emailCadastro, String senhaCadastro) {
        if (emailCadastro.endsWith(".com") && senhaCadastro.length() <= 14) {
            return true;
        }else {
            return false;
        }
    }

    void login(String email, String senha, String emailCadastrado, String senhaCadastrado){
        if (email.equalsIgnoreCase(emailCadastrado) && senha.equalsIgnoreCase(senhaCadastrado)){

            System.out.println("-------------------------------------------------------");
            System.out.println("Login realizado com sucesso!");

            String primeiraLetraMaiuscula = emailCadastrado.substring(0, 1).toUpperCase();
            String restoDoNome = emailCadastrado.substring(1).toLowerCase();
            String nomeUsuarioFormatado = primeiraLetraMaiuscula + restoDoNome;
            String[] nomeDoUsuario = nomeUsuarioFormatado.split("@");

            System.out.println("Bem vindo! Usuário: " + nomeDoUsuario[0]);

        }else {
            System.out.println("-------------------------------------------------------");
            System.out.println("Seu email ou senha podem estar incorretos!");
        }

    }

    Boolean validarLogin(String email, String senha, String emailCadastrado, String senhaCadastrado){
        if (email.equalsIgnoreCase(emailCadastrado) && senha.equalsIgnoreCase(senhaCadastrado)){
            return true;
        }else {
            System.out.println("-------------------------------------------------------");
            System.out.println("Tente Novamente!");
            return false;
        }
    }

}
