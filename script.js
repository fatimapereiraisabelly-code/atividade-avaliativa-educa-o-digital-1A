// --- DADOS DINÂMICOS ---
const conquistas = [
    { titulo: "Libertadores", ano: "1983, 1995, 2017", icone: "🏆" },
    { titulo: "Mundial", ano: "1983", icone: "🌎" },
    { titulo: "Copa do Brasil", ano: "5 Títulos", icone: "🇧🇷" }
];

const faqData = [
    { q: "Como se associar?", a: "Acesse o portal do associado e escolha seu plano." },
    { q: "Onde fica a Arena?", a: "Bairro Farrapos, Porto Alegre - RS." }
];

// --- RENDERIZAÇÃO ---
function renderContent() {
    const grid = document.getElementById('grid-trophies');
    grid.innerHTML = conquistas.map(item => `
        <article class="card">
            <span style="font-size: 2rem">${item.icone}</span>
            <h3>${item.titulo}</h3>
            <p>${item.ano}</p>
        </article>
    `).join('');

    const accordionContainer = document.getElementById('accordion-container');
    accordionContainer.innerHTML = faqData.map((item, index) => `
        <div class="accordion-item">
            <button class="accordion-header" aria-expanded="false" onclick="toggleAccordion(${index})">
                ${item.q}
            </button>
            <div class="accordion-content" id="content-${index}">
                <p>${item.a}</p>
            </div>
        </div>
    `).join('');
}

// --- ACESSIBILIDADE: FONTE E CONTRASTE ---
let fontSize = 100;
document.getElementById('btn-font-up').addEventListener('click', () => {
    fontSize += 10;
    document.documentElement.style.fontSize = `${fontSize}%`;
});

document.getElementById('btn-font-down').addEventListener('click', () => {
    fontSize -= 10;
    document.documentElement.style.fontSize = `${fontSize}%`;
});

document.getElementById('btn-contrast').addEventListener('click', () => {
    document.body.classList.toggle('high-contrast');
});

// --- COMPONENTES: ACCORDION ---
function toggleAccordion(index) {
    const contents = document.querySelectorAll('.accordion-content');
    contents[index].classList.toggle('active');
    const isExpanded = contents[index].classList.contains('active');
    document.querySelectorAll('.accordion-header')[index].setAttribute('aria-expanded', isExpanded);
}

// --- SCROLL REVEAL SIMPLES ---
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, { threshold: 0.1 });

// --- INICIALIZAÇÃO ---
window.onload = () => {
    renderContent();
    // Observar cards para animação
    document.querySelectorAll('.card').forEach(card => observer.observe(card));
};
