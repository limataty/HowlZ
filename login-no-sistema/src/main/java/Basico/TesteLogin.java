package Basico;

import java.util.Scanner;

public class TesteLogin {
    public static void main(String[] args) {
        Scanner in = new Scanner(System.in);

        String continuarOuNao = "";

        do {

            System.out.println("Digite seu email:");
            String email = in.next();

            System.out.println("Digite sua senha:");
            String senha = in.next();

            if (email.equals("HowlZ@gmail.com") && senha.equals("admin")){
                System.out.println("Login realizado com sucesso!");
                System.exit(0);
            }else {
                System.out.println("Seu email ou senha podem estar incorretos!");
                System.out.println("Deseja tentar logar novamente? S/N");
                continuarOuNao = in.next();
            }

        }while(!continuarOuNao.equalsIgnoreCase("N"));

    }
}
