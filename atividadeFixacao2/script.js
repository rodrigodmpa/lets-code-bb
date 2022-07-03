function calcula_media(num1, num2) {
    return (num1 + num2) / 2
}
function calcula_produto(num1, num2) {
    return num1 * num2
}

function calcula_media_ponderada(nota1, peso1, nota2, peso2) {
    return ((calcula_produto(nota1, peso1) + calcula_produto(nota2, peso2)) / (peso1 + peso2)).toFixed(2)
}

function mostra_media_ponderada(event) {
    event.preventDefault();
    const aluno1_matricula = document.getElementById("aluno1_matricula").value;
    const aluno1_nota1 = +document.getElementById("aluno1_nota1").value;
    const aluno1_peso1 = +document.getElementById("aluno1_peso1").value;
    const aluno1_nota2 = +document.getElementById("aluno1_nota2").value;
    const aluno1_peso2 = +document.getElementById("aluno1_peso2").value;
    const aluno2_matricula = document.getElementById("aluno2_matricula").value;
    const aluno2_nota1 = +document.getElementById("aluno2_nota1").value;
    const aluno2_peso1 = +document.getElementById("aluno2_peso1").value;
    const aluno2_nota2 = +document.getElementById("aluno2_nota2").value;
    const aluno2_peso2 = +document.getElementById("aluno2_peso2").value;
    document.getElementById("media_ponderada").innerHTML =
        "A média ponderada de " + aluno1_matricula + " é: " + calcula_media_ponderada(aluno1_nota1, aluno1_peso1, aluno1_nota2, aluno1_peso2) +
        "<br /> A média ponderada de " + aluno2_matricula + " é: " + calcula_media_ponderada(aluno2_nota1, aluno2_peso1, aluno2_nota2, aluno2_peso2);


}

function calcula_salario_liquido(salario) {
    const inss = salario * .1;
    const fgts = salario * .08;
    const plano_saude = 100;
    const liq = salario - inss - fgts - plano_saude;
    return [liq, inss, fgts, plano_saude]
}

function mostra_salario_liquido(event) {
    event.preventDefault();
    const salario_bruto = +document.getElementById("salario_bruto").value;
    document.getElementById("salario_liquido").innerHTML =
        "O salário líquido é " + formatCurrency(calcula_salario_liquido(salario_bruto)[0].toFixed(2));

}

function mostra_aprovacao(event) {
    event.preventDefault();
    const nota_parcial1 = +document.getElementById("nota_parcial1").value;
    const nota_parcial2 = +document.getElementById("nota_parcial2").value;
    const media = calcula_media(nota_parcial1, nota_parcial2).toFixed(2);

    const mensagem = media < 7 ? 'Reprovado' : media < 10 ? 'Aprovado' : 'Aprovado com Distinção'
    document.getElementById("media_aluno").innerHTML =
        "Média: " + media + " - Situação: " + mensagem;

}

function calcula_novo_salario(salario_antigo) {
    let percentual;
    if (salario_antigo <= 280) {
        percentual = .2
    } else if (salario_antigo < 700) {
        percentual = .15
    } else if (salario_antigo < 1500) {
        percentual = .1
    } else {
        percentual = .05
    }
    return {
        percentual,
        aumento: salario_antigo * percentual,
        novo_salario: salario_antigo * (1 + percentual)
    }

}

function mostra_novo_salario(event) {
    event.preventDefault();

    const salario_antigo = +document.getElementById("salario_antigo").value;
    const { novo_salario, aumento, percentual } = calcula_novo_salario(salario_antigo);
    document.getElementById("salario_novo").innerHTML =
        "Salário antigo: " + formatCurrency(salario_antigo.toFixed(2)) +
        "</br> Percentual de aumento: " + percentual * 100 + "%" +
        "</br> Aumento: " + formatCurrency(aumento.toFixed(2)) +
        "</br> Novo Salário: " + formatCurrency(novo_salario.toFixed(2));

}

function calcula_folha(valor_hora, horas) {
    const salario_bruto = calcula_produto(valor_hora, horas);
    const sindicato = .03 * salario_bruto
    let ir;
    if (salario_bruto <= 900) ir = 0
    else if (salario_bruto <= 1500) ir = .05 * salario_bruto
    else if (salario_bruto <= 2500) ir = .1 * salario_bruto
    else ir = .2 * salario_bruto

    const fgts = .11 * salario_bruto
    const salario_liquido = salario_bruto - sindicato - ir;
    return {
        salario_bruto,
        salario_liquido,
        sindicato,
        fgts,
        ir,
    }
}

function mostra_folha(event) {
    event.preventDefault()
    const horas_trabalhadas = +document.getElementById("horas_trabalhadas").value;
    const valor_hora = +document.getElementById("valor_hora").value;


    const { salario_bruto, salario_liquido, ir, sindicato, fgts } = calcula_folha(valor_hora, horas_trabalhadas);
    document.getElementById('espelho').style.display = 'table';
    document.getElementById('bruto').innerHTML = formatCurrency(salario_bruto.toFixed(2));
    document.getElementById('ir').innerHTML = formatCurrency(ir.toFixed(2));
    document.getElementById('sindicato').innerHTML = formatCurrency(sindicato.toFixed(2));
    document.getElementById('fgts').innerHTML = formatCurrency(fgts.toFixed(2));
    document.getElementById('liquido').innerHTML = formatCurrency(salario_liquido.toFixed(2));


}


function formatCurrency(value) {
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL', minimumFractionDigits: 2 }).format(value);
}
