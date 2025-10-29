/* script.js - interatividade básica: menu, ano, gráfico e formulário (client-side) */

document.addEventListener('DOMContentLoaded', function () {
  // menu toggle (works for all 3 headers)
  const menuButtons = document.querySelectorAll('.menu-button');
  menuButtons.forEach(btn => {
    const navId = btn.getAttribute('aria-controls') || btn.id.replace('btn-', 'site-nav-');
    const nav = document.getElementById(navId) || document.querySelector('.site-nav');
    btn.addEventListener('click', () => {
      const expanded = btn.getAttribute('aria-expanded') === 'true';
      btn.setAttribute('aria-expanded', String(!expanded));
      if (nav) nav.classList.toggle('show');
    });
  });

  // Atualizar os anos do rodapé dinamicamente
  const ano = new Date().getFullYear();
  document.querySelectorAll('#ano, #ano-2, #ano-3').forEach(el => { el.textContent = ano; });

  // Formulário (apenas validação front-end e feedback)
  const form = document.getElementById('signupForm');
  if (form) {
    const msg = document.getElementById('formMessage');
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      // validações simples
      const nome = form.nome.value.trim();
      const telefone = form.telefone.value.trim();
      const email = form.email.value.trim();
      const interesse = form.interesse.value;

      if (!nome || !telefone || !email || !interesse) {
        msg.textContent = 'Por favor, preencha todos os campos obrigatórios.';
        msg.style.color = 'crimson';
        return;
      }

      // Simula envio
      msg.style.color = 'green';
      msg.textContent = 'Obrigado! Seu cadastro foi recebido. Em breve entraremos em contato.';
      form.reset();
    });
  }

  // Gráfico de doações (canvas) - dados exemplo mensais (valores em R$)
  const donationData = {
    labels: ['Jan','Fev','Mar','Abr','Mai','Jun','Jul','Ago','Set','Out','Nov','Dez'],
    values: [4200, 3200, 5000, 6200, 4700, 7000, 8200, 7600, 6800, 9000, 7600, 9400]
  };

  const canvas = document.getElementById('donationChart');
  if (canvas && canvas.getContext) {
    const ctx = canvas.getContext('2d');

    // responsive canvas drawing scale
    function drawChart() {
      // clear
      const DPR = window.devicePixelRatio || 1;
      const width = canvas.clientWidth;
      const height = canvas.clientHeight;
      canvas.width = width * DPR;
      canvas.height = height * DPR;
      ctx.scale(DPR, DPR);
      ctx.clearRect(0,0,width,height);

      // chart dimensions
      const padding = 24;
      const chartW = width - padding * 2;
      const chartH = height - padding * 2;
      const maxVal = Math.max(...donationData.values) * 1.1;
      const barWidth = chartW / donationData.values.length * 0.6;
      const gap = (chartW / donationData.values.length) - barWidth;

      // axes
      ctx.strokeStyle = '#e6e6e6';
      ctx.beginPath();
      ctx.moveTo(padding, padding + chartH);
      ctx.lineTo(padding + chartW, padding + chartH);
      ctx.stroke();

      // draw bars
      donationData.values.forEach((v, i) => {
        const x = padding + i * (barWidth + gap) + gap/2;
        const barH = (v / maxVal) * chartH;
        const y = padding + (chartH - barH);

        // gradient fill
        const grad = ctx.createLinearGradient(x, y, x, y + barH);
        grad.addColorStop(0, '#66bb6a');
        grad.addColorStop(1, '#2e7d32');

        ctx.fillStyle = grad;
        roundRect(ctx, x, y, barWidth, barH, 6, true, false);

        // label
        ctx.fillStyle = '#444';
        ctx.font = '12px system-ui, Arial';
        ctx.textAlign = 'center';
        ctx.fillText(donationData.labels[i], x + barWidth/2, padding + chartH + 16);
      });

      // total
      const total = donationData.values.reduce((a,b) => a+b, 0);
      const totalEl = document.getElementById('total-raised');
      if (totalEl) totalEl.textContent = 'R$ ' + numberFormat(total);

      // small function to draw rounded rectangles
      function roundRect(ctx, x, y, w, h, r, fill, stroke) {
        if (typeof r === 'undefined') r = 5;
        ctx.beginPath();
        ctx.moveTo(x + r, y);
        ctx.arcTo(x + w, y, x + w, y + h, r);
        ctx.arcTo(x + w, y + h, x, y + h, r);
        ctx.arcTo(x, y + h, x, y, r);
        ctx.arcTo(x, y, x + w, y, r);
        ctx.closePath();
        if (fill) ctx.fill();
        if (stroke) ctx.stroke();
      }
    }

    // helpers
    function numberFormat(n){
      return n.toLocaleString('pt-BR', {style:'currency', currency: 'BRL'}).replace('R$','R$ ');
    }

    // initial draw
    function initChart() {
      // set css size of canvas to its container width (maintain height ratio)
      canvas.style.width = '100%';
      canvas.style.height = '260px';
      drawChart();
    }

    initChart();
    window.addEventListener('resize', () => {
      // reset transform before redraw
      const DPR = window.devicePixelRatio || 1;
      canvas.getContext('2d').setTransform(1,0,0,1,0,0);
      drawChart();
    });
  }
});
