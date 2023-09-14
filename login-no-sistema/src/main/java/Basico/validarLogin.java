package Basico;

public class validarLogin {
    void login(String email, String senha){

        if (email.equals("HowlZ@gmail.com") && senha.equals("HowlZoMelhor")){
            System.out.println("Login realizado com sucesso!");
        }else {
            System.out.println("Seu email ou senha podem estar incorretos!");
        }
    }
}
