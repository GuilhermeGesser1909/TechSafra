# TechSafra API

## 🧩 Sobre o projeto
O **TechSafra API** é um backend desenvolvido em **Java com Spring Boot**, responsável por integrar as funcionalidades entre o sistema web e o frontend, oferecendo endpoints RESTful seguros e performáticos.

## ⚙️ Tecnologias utilizadas
- Java 17+
- Spring Boot
- Maven
- JPA / Hibernate
- MySQL (ou outro banco configurado no `application.properties`)
- Lombok (opcional)

## 🚀 Como executar o projeto
### Pré-requisitos
- Java 17+ instalado
- Maven instalado

### Passos para rodar o backend
```bash
# Clonar o repositório
git clone https://github.com/GuilhermeGesser1909/projeto-techsafra.git

# Entrar no diretório
cd TechSafraApi

# Compilar o projeto
mvn clean install

# Executar a aplicação
mvn spring-boot:run
```

A aplicação estará disponível em:
```
http://localhost:8080
```

## 📂 Estrutura do projeto
```
TechSafraApi/
├── src/
│   ├── main/
│   │   ├── java/              # Código-fonte da aplicação
│   │   └── resources/         # Configurações e templates
│   └── test/
│       └── java/              # Testes unitários
├── pom.xml                    # Configuração Maven
└── README.md
```

---

