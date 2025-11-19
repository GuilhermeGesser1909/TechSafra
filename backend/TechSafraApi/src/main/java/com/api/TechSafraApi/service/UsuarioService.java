package com.api.TechSafraApi.service;

import com.api.TechSafraApi.model.Usuario;
import com.api.TechSafraApi.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UsuarioService {

    private final UsuarioRepository usuarioRepository;

    @Autowired
    public UsuarioService(UsuarioRepository usuarioRepository) {
        this.usuarioRepository = usuarioRepository;
    }

    public String cadastrarUsuario(String nome, String email, String senha, String confirmarSenha) {
        if (nome == null || nome.trim().isEmpty()) {
            return "O nome é obrigatório!";
        }
        if (email == null || email.trim().isEmpty()) {
            return "O e-mail é obrigatório!";
        }
        if (senha == null || senha.trim().isEmpty()) {
            return "A senha é obrigatória!";
        }
        if (!senha.equals(confirmarSenha)) {
            return "As senhas não coincidem!";
        }

        Optional<Usuario> existente = usuarioRepository.findByEmail(email);
        if (existente.isPresent()) {
            return "E-mail já cadastrado!";
        }

        Usuario usuario = new Usuario(nome, email, senha);
        usuarioRepository.save(usuario);
        return "Usuário cadastrado com sucesso!";
    }

    public String loginUsuario(String email, String senha) {
        if (email == null || email.trim().isEmpty() || senha == null || senha.trim().isEmpty()) {
            return "E-mail e senha são obrigatórios!";
        }

        Optional<Usuario> usuarioOptional = usuarioRepository.findByEmail(email);
        if (usuarioOptional.isEmpty()) {
            return "E-mail não cadastrado!";
        }

        Usuario usuario = usuarioOptional.get();
        if (!usuario.getSenha().equals(senha)) {
            return "Senha incorreta!";
        }

        return "Login realizado com sucesso!";
    }

    public List<Usuario> listarTodos() {
        return usuarioRepository.findAll();
    }

    public Usuario buscarPorId(Long id) {
        return usuarioRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Usuário não encontrado com ID: " + id));
    }
    
    public Usuario buscarPorEmail(String email) {
        return usuarioRepository.findByEmail(email)
            .orElseThrow(() -> new RuntimeException("Usuário não encontrado"));
    }

}
