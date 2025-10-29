// script.js

// ==========================
// MENU HAMBÚRGUER RESPONSIVO
// ==========================
const menuToggle = document.querySelector('.menu-toggle');
const navMenu = document.querySelector('.nav-menu'); // Classe adicionada no HTML

if (menuToggle && navMenu) {
    menuToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        menuToggle.classList.toggle('open');
    });
}

// ==========================
// SUBMENU DROPDOWN
// ==========================
const dropdowns = document.querySelectorAll('.dropdown');

dropdowns.forEach(dropdown => {
    dropdown.addEventListener('mouseenter', () => {
        dropdown.querySelector('.submenu').classList.add('show');
    });

    dropdown.addEventListener('mouseleave', () => {
        dropdown.querySelector('.submenu').classList.remove('show');
    });
});

// ==========================
// VALIDAÇÃO DE FORMULÁRIO
// ==========================
const form = document.querySelector('form');
if (form) {
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        let valid = true;
        const inputs = form.querySelectorAll('input[required], textarea[required]');

        inputs.forEach(input => {
            if (!input.value.trim()) {
                input.classList.add('error');
                valid = false;
            } else {
                input.classList.remove('error');
            }
        });

        if (valid) {
            showToast('Formulário enviado com sucesso! Entraremos em contato.', 'success');
            form.reset();
        } else {
            showToast('Por favor, preencha todos os campos obrigatórios.', 'error');
        }
    });
}

// ==========================
// TOASTS (FEEDBACK VISUAL)
// ==========================
function showToast(message, type) {
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.textContent = message;
    document.body.appendChild(toast);

    setTimeout(() => toast.classList.add('show'), 100);
    setTimeout(() => toast.classList.remove('show'), 3000);
    setTimeout(() => toast.remove(), 3500);
}

// ==========================
// MODAL DE INFORMAÇÃO
// ==========================
const modal = document.querySelector('.modal');
const modalBtn = document.querySelector('.open-modal');
const closeModal = document.querySelector('.close-modal');

if (modalBtn && modal) {
    modalBtn.addEventListener('click', () => {
        modal.classList.add('active');
    });
}

if (closeModal && modal) {
    closeModal.addEventListener('click', () => {
        modal.classList.remove('active');
    });
}

// Fechar modal clicando fora
if (modal) {
    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('active');
        }
    });
}
