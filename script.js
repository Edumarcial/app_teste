document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('form-candidatura');
    const modal = document.getElementById('modal-feedback');
    const modalContent = modal.querySelector('.modal-content');
    const modalTitulo = document.getElementById('modal-titulo');
    const modalMensagem = document.getElementById('modal-mensagem');
    const btnFecharModal = document.getElementById('modal-btn-fechar');

    form.addEventListener('submit', (evento) => {
        evento.preventDefault();

        const nome = document.getElementById('nome').value.trim();
        const rawIdade = document.getElementById('idade').value.trim();
        const rawAltura = document.getElementById('altura').value.trim();

        // Tratamento de campos nulos/vazios
        if (!nome || !rawIdade || !rawAltura) {
            abrirModal('atencao', 'Campos Incompletos', 'Preencha todos os dados solicitados para prosseguir.');
            return;
        }

        const idade = parseInt(rawIdade, 10);
        
        // Tratamento de input com vírgula ou em centímetros
        let altura = parseFloat(rawAltura.replace(',', '.'));
        if (altura > 3) {
            altura = altura / 100;
        }

        // Validação de sanidade numérica
        if (isNaN(idade) || isNaN(altura) || idade <= 0 || altura <= 0) {
            abrirModal('atencao', 'Dados Inválidos', 'Informe valores numéricos válidos e maiores que zero.');
            return;
        }

        // Regra de negócio explícita: altura >= 1.70 e idade >= 18
        const ehApto = altura >= 1.70 && idade >= 18;

        if (ehApto) {
            abrirModal(
                'aprovado',
                'Status: Elegível',
                'Parabéns! Você pode prosseguir no processo para a vaga!'
            );
        } else {
            abrirModal(
                'reprovado',
                'Status: Inelegível',
                'Infelizmente você não é apto à vaga'
            );
        }
    });

    function abrirModal(estado, titulo, mensagem) {
        // Remove classes anteriores
        modalContent.classList.remove('aprovado', 'reprovado', 'atencao');
        modalContent.classList.add(estado);

        modalTitulo.textContent = titulo;
        modalMensagem.textContent = mensagem;

        // Abre modal nativo com backdrop isolado
        modal.showModal();
    }

    // Ação do botão "OK"
    btnFecharModal.addEventListener('click', () => {
        modal.close();
    });

    // Permite fechar ao clicar fora da caixa do modal
    modal.addEventListener('click', (e) => {
        const rect = modalContent.getBoundingClientRect();
        const clicouFora = (
            e.clientX < rect.left ||
            e.clientX > rect.right ||
            e.clientY < rect.top ||
            e.clientY > rect.bottom
        );
        if (clicouFora) {
            modal.close();
        }
    });
});