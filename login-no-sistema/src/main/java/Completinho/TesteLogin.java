package Completinho;

import javax.swing.text.StyledEditorKit;
import java.util.Locale;
import java.util.Scanner;

public class TesteLogin {
    public static void main(String[] args) {
        Scanner in = new Scanner(System.in);

        validarLogin logar = new validarLogin();

        logar.espaco();
        System.out.println("Iremos iniciar o seu cadastro!");
        logar.espaco();

        System.out.println("Digite seu email para o cadastro:");
        String emailCadastro = in.next();

        logar.espaco();

        System.out.println("Digite sua senha para o cadastro:");
        String senhaCadastro = in.next();

        logar.validarCadastro(emailCadastro, senhaCadastro);
        Boolean validade = logar.validado(emailCadastro, senhaCadastro);

        if (validade){
            Integer numeros = 0;

            do {

                System.out.println("Digite seu email:");
                String email = in.next();

                logar.espaco();

                System.out.println("Digite sua senha:");
                String senha = in.next();

                logar.login(email, senha, emailCadastro, senhaCadastro);
                Boolean loginValidade = logar.validarLogin(email, senha, emailCadastro, senhaCadastro);

                if (loginValidade){
                    numeros = 1;
                }

            }while (numeros.equals(0));

        }
    }
}
