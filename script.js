const SUPABASE_URL = "https://cnxwuzyixnnuqlxzkeqg.supabase.co";

const SUPABASE_PUBLISHABLE_KEY =
    "sb_publishable_RC_ivo9OTtIbX0voTB7nCg_A5-lSyiJ";

const clienteSupabase = window.supabase.createClient(
    SUPABASE_URL,
    SUPABASE_PUBLISHABLE_KEY
);

const cadastroForm =
    document.getElementById("cadastroForm");

if (cadastroForm) {

    cadastroForm.addEventListener(
        "submit",
        async function(event) {

            event.preventDefault();

            const nome =
                document.getElementById("nome").value;

            const email =
                document.getElementById("email").value;

            const senha =
                document.getElementById("senha").value;

            const confirmarSenha =
                document.getElementById("confirmarSenha").value;

            if (senha !== confirmarSenha) {

                document.getElementById("mensagem").textContent =
                    "As senhas não são iguais.";

                return;
            }

            const { data, error } =
                await clienteSupabase.auth.signUp({

                    email: email,

                    password: senha,

                    options: {
                        data: {
                            nome: nome
                        }
                    }

                });

            if (error) {

                console.error(error);

                document.getElementById("mensagem").textContent =
                    "Erro: " + error.message;

                return;
            }

            console.log(data);

            document.getElementById("mensagem").textContent =
                "Cadastro realizado com sucesso!";
        }
    );
}

const loginForm =
    document.getElementById("loginForm");

if (loginForm) {

    loginForm.addEventListener(
        "submit",
        async function(event) {

            event.preventDefault();

            const email =
                document.getElementById("email").value;

            const senha =
                document.getElementById("senha").value;

            const { data, error } =
                await clienteSupabase.auth.signInWithPassword({
                    email: email,
                    password: senha
                });

            if (error) {

                console.error(error);

                document.getElementById("mensagem").textContent =
                    "E-mail ou senha incorretos.";

                return;
            }

            console.log(data);

            window.location.href =
                "pagina-principal.html";
        }
    );
}

const btnSair =
    document.getElementById("btnSair");

if (btnSair) {

    btnSair.addEventListener(
        "click",
        async function() {

            const { error } =
                await clienteSupabase.auth.signOut();

            if (error) {

                console.error(error);

                document.getElementById("mensagem").textContent =
                    "Não foi possível sair.";

                return;
            }

            window.location.href =
                "index.html";
        }
    );
}