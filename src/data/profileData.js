export const profileData = {
    personal: {
        name: "Venkatsai Kumar Vavilashetty",
        shortName: "Venkat Sai",
        title: "AI Engineer",
        location: "Pune, Maharashtra",
        phone: "+91 93705 34381",
        email: "saikumarvavilashetty03@gmail.com",
        github: "https://github.com/Venkat-SaiKumar",
        linkedin: "https://www.linkedin.com/in/venkatsai-kumar/",
        photo: "/photo.png",
        taglines: [
            "Building Intelligent AI Systems",
            "Multi-Agent Orchestration Expert",
            "Generative AI Pioneer",
            "Turning Data into Decisions"
        ],
        summary: `AI/ML Engineer with 3+ years of experience specializing in Generative AI, multi-agent systems, and enterprise-scale AI platform development. Proven expertise in building production-ready AI solutions using LangGraph, LangChain, and MCP/A2A protocols, with hands-on experience in architecting complex multi-agent orchestration workflows. Strong proficiency in Python development with deep knowledge of NLP, LLMs (GPT-4, Claude), and RAG architectures combined with vector databases and Neo4j graph databases. Demonstrated success in delivering end-to-end AI platforms from conception to deployment. Track record of reducing operational costs by 90% through prompt optimization and improving system efficiency by 80% through intelligent automation.`
    },

    skills: [
        {
            category: "Programming & Core",
            icon: "Code2",
            items: ["Python", "SQL", "JavaScript", "React", "Git", "GitLab", "VSCode"]
        },
        {
            category: "AI/ML Frameworks",
            icon: "Brain",
            items: ["LangChain", "LangGraph", "OpenAI GPT-4", "Anthropic Claude", "Azure OpenAI", "TensorFlow", "PyTorch", "Keras", "Scikit-learn", "NLTK", "SpaCy", "Pandas", "NumPy"]
        },
        {
            category: "Generative AI",
            icon: "Sparkles",
            items: ["Prompt Engineering", "Prompt Caching", "RAG", "MCP", "A2A Protocols", "Agent Orchestration", "Multi-Agent Systems", "LLMs"]
        },
        {
            category: "ML & Deep Learning",
            icon: "Network",
            items: ["Linear Regression", "Logistic Regression", "Decision Trees", "Random Forest", "XGBoost", "SVM", "K-Means", "CNN", "RNN", "Transformers", "GANs", "VAEs"]
        },
        {
            category: "NLP",
            icon: "MessageSquare",
            items: ["Text Tokenization", "Text Classification", "Sentiment Analysis", "Word Embeddings", "Document Chunking", "Semantic Splitting", "Data Mining"]
        },
        {
            category: "Databases & Storage",
            icon: "Database",
            items: ["PostgreSQL", "Neo4j", "Redis", "Vector Databases", "Azure Blob Storage", "Azure Key Vault", "Azure Data Lake"]
        },
        {
            category: "Backend & Architecture",
            icon: "Server",
            items: ["FastAPI", "Celery", "RESTful APIs", "Microservices", "Clean Architecture", "DDD", "ETL Patterns", "Async/Await", "Webhooks"]
        },
        {
            category: "Cloud & Big Data",
            icon: "Cloud",
            items: ["AWS SageMaker", "S3", "Lambda", "Redshift", "Azure Data Factory", "Databricks", "Hadoop", "Spark"]
        },
        {
            category: "DevOps & Deployment",
            icon: "Container",
            items: ["Docker", "Docker Compose", "CI/CD Pipelines", "System Integration"]
        }
    ],

    experience: [
        {
            role: "AI Engineer",
            company: "IndexNine",
            location: "Pune, Maharashtra",
            period: "May 2024 – Present",
            projects: [
                {
                    name: "Test Case Generation Platform",
                    description: "Developed enterprise test automation platform generating comprehensive test cases from Jira user stories using multi-agent AI pipeline, reducing manual test creation time by 80% and improving test coverage by 40%.",
                    highlights: [
                        "Architected 20-agent parallel processing system using LangGraph with 4 concurrent processing lanes",
                        "Designed 4-layer clean architecture with 9 feature modules",
                        "Built hybrid RAG system combining vector search and Neo4j graph database, improving context accuracy by 30%",
                        "Implemented Celery + Redis distributed task queue handling 200+ concurrent requests",
                        "Achieved 90% cost reduction on LLM calls through prompt caching",
                        "Generated 500+ test specifications across 50+ projects with 99.5% uptime"
                    ],
                    tech: ["LangGraph", "Neo4j", "RAG", "Celery", "Redis", "Python"]
                },
                {
                    name: "Test Automation Platform",
                    description: "Built agentic test automation system using LangGraph and Playwright MCP that automatically executes generated test cases with intelligent error handling.",
                    highlights: [
                        "Multi-agent workflow handling dynamic blockers, pop-ups, and UI changes",
                        "Real-time test execution with visual feedback",
                        "Self-healing capabilities for common test failures",
                        "Generated flat, maintainable test scripts for CI/CD integration"
                    ],
                    tech: ["LangGraph", "Playwright", "MCP", "Python"]
                },
                {
                    name: "Legacy Code Modernization Platform",
                    description: "Built legacy code analysis platform using Tree-Sitter algorithm to parse and load entire codebases into Neo4j graph database.",
                    highlights: [
                        "Graph database schema capturing code structure relationships",
                        "Automated relationship mapping for dependency visualization",
                        "Applied Spec-Driven Development (SDD) methodology",
                        "Graph traversal queries for critical path identification"
                    ],
                    tech: ["Tree-Sitter", "Neo4j", "Python", "Graph DB"]
                },
                {
                    name: "RAG Document Intelligence Platform",
                    description: "Built RAG-based document intelligence platform with React frontend enabling natural language querying across Google Drive documents.",
                    highlights: [
                        "Automated document processing pipeline with OpenAI embeddings",
                        "Google Drive webhook integration for real-time sync",
                        "LangGraph agentic flow for intelligent query routing",
                        "Real-time vector database synchronization"
                    ],
                    tech: ["RAG", "React", "LangGraph", "OpenAI", "Vector DB"]
                },
                {
                    name: "MCP Proxy Server",
                    description: "Developed Model Context Protocol proxy server that abstracts multiple MCP tools behind a single unified interface.",
                    highlights: [
                        "Intelligent tool routing mechanism analyzing user requests",
                        "LangGraph agentic flow for multi-tool orchestration",
                        "Single-entry-point API simplifying MCP tool access",
                        "Natural language interface for non-technical users"
                    ],
                    tech: ["MCP", "LangGraph", "FastAPI", "Python"]
                }
            ]
        },
        {
            role: "Associate Consultant",
            company: "Eviden | Atos",
            location: "Pune, Maharashtra",
            period: "November 2021 – May 2024",
            projects: [
                {
                    name: "Churn Prediction Model",
                    description: "Developed a churn prediction model for telecommunication domain using Python, Logistic Regression, and XGBoost, reducing churn rates by 20%.",
                    highlights: [
                        "Reduced churn rates by 20% through accurate identification of at-risk customers",
                        "Increased customer satisfaction by 15% with data-driven retention strategies",
                        "Feature engineering including handling missing data, scaling, and encoding",
                        "Designed Tableau dashboards for predictive analytics insights"
                    ],
                    tech: ["Python", "XGBoost", "Logistic Regression", "Tableau", "SQL"]
                }
            ]
        }
    ],

    projects: [
        {
            name: "Personalized Movie Recommendation Engine",
            description: "Netflix-style recommendation engine using collaborative filtering and content-based algorithms for personalized movie suggestions.",
            tech: ["Python", "ML", "Collaborative Filtering"],
            link: "#"
        },
        {
            name: "SPAM Detection in SMS & Emails",
            description: "NLP-powered spam detection system for SMS and email classification using text preprocessing and machine learning models.",
            tech: ["Python", "NLP", "Classification"],
            link: "#"
        },
        {
            name: "Semantic Similarity in Question Pairs",
            description: "Predicting semantic similarity between question pairs using machine learning techniques for duplicate question identification.",
            tech: ["Python", "NLP", "Deep Learning"],
            link: "#"
        }
    ],

    education: {
        degree: "Bachelor of Engineering in Electronics and Telecommunication",
        institution: "Dr. D. Y. Patil School of Engineering",
        location: "Pune, Maharashtra",
        period: "2017 – 2021"
    },

    publications: [
        {
            title: "Prediction of Cardiac Arrest Using Multiple Machine Learning Classifiers",
            description: "Research on predicting cardiovascular disease risk using ML algorithms to enhance early diagnosis capabilities.",
            results: [
                "Random Forest: 93.1% accuracy",
                "SVM: 93.1% accuracy",
                "KNN: 89.66% accuracy",
                "Logistic Regression: 86.21% accuracy",
                "Decision Tree: 89.66% accuracy"
            ],
            link: "#"
        }
    ]
};
