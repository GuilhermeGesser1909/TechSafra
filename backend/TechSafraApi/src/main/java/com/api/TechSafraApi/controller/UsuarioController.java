package com.api.TechSafraApi.controller;

import com.api.TechSafraApi.model.Usuario;
import com.api.TechSafraApi.service.UsuarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import java.util.UUID;

@RestController
@RequestMapping("/usuarios")
@CrossOrigin(origins = "*") // libera para o front acessar
public class UsuarioController {

    private final UsuarioService usuarioService;

    @Autowired
    public UsuarioController(UsuarioService usuarioService) {
        this.usuarioService = usuarioService;
    }

    // 🔹 Cadastrar novo usuário
    @PostMapping("/cadastrar")
    public ResponseEntity<String> cadastrar(@RequestBody Map<String, String> body) {
        String nome = body.get("nome");
        String email = body.get("email");
        String senha = body.get("senha");
        String confirmarSenha = body.get("confirmarSenha");

        String resultado = usuarioService.cadastrarUsuario(nome, email, senha, confirmarSenha);

        if (resultado.equals("Usuário cadastrado com sucesso!")) {
            return ResponseEntity.status(HttpStatus.CREATED).body(resultado);
        } else {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(resultado);
        }
    }

    @PostMapping("/login")
    @CrossOrigin(origins = "*") // ⚠️ garante que o front consiga acessar
    public ResponseEntity<?> login(@RequestBody Map<String, String> body) {
        String email = body.get("email");
        String senha = body.get("senha");

        String resultado = usuarioService.loginUsuario(email, senha);

        if (resultado.equals("E-mail e senha são obrigatórios!") ||
            resultado.equals("E-mail não cadastrado!") ||
            resultado.equals("Senha incorreta!")) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of("erro", resultado));
        }

        // 🔹 Aqui você pega o usuário autenticado e retorna seus dados
        Usuario usuario = usuarioService.buscarPorEmail(email);
        return ResponseEntity.ok(Map.of(
            "id", usuario.getId(),
            "email", usuario.getEmail(),
            "mensagem", "Login realizado com sucesso"
        ));
    }


    // 🔹 (Opcional) Buscar todos os usuários - útil pra testar
    @GetMapping
    public ResponseEntity<?> listarTodos() {
        return ResponseEntity.ok(usuarioService.listarTodos());
    }

    // 🔹 (Opcional) Buscar usuário por ID
    @GetMapping("/{id}")
    public ResponseEntity<Usuario> buscarPorId(@PathVariable UUID id) {
        Usuario usuario = usuarioService.buscarPorId(id);
        return ResponseEntity.ok(usuario);
    }
}
