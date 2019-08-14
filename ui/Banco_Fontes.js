//function timer interval
var timer_tick = 500;
var ponteiro;
var text;
var list = [];
var list_aco = [];
//var inicia_banco;

function loadData()
{
  list = [];
  list_aco = [];

  list[0] = "0,5";
  list[1] = "1,0";
  list[2] = "1,5";
  list[3] = "2,0";

  list[4] = "3,0";
  list[5] = "4,0";
  list[6] = "6,0";
  list[7] = "8,0";

  list[8] = "10,0";
  list[9] = "12,0";
  list[10] ="16,0";
  list[11] ="20,0";
  list[12] ="25,0";
  list[13] ="30,0";
  list[14] ="32,0";
  list[15] ="40,0";

  list_aco[0] = "Carbono";
  list_aco[1] = "Aço Inox";
  list_aco[2] = "Aluminio";
}

function salva_receita()         // Salvar nome da Receita em CLP
{
  var text = Nome_Receita.displayText; //funcionou parcialmente;
  guiInterface("vars::string_value_write", "RES1__POU_DADOS_RECEITAS.NOME", text);
  guiInterface("vars::bool_value_write",  "RES1__POU_DADOS_RECEITAS.BIT_SALVA", true);
}

function modelo_fonte()          // Verifica modelo da Fonte e envia para CLP
{
 var index = Fonte.currentIndex;
 var text = guiInterface("call::Fonte::itemText", index);
  guiInterface("vars::string_value_write", "RES1__POU_DADOS_RECEITAS.FONTE", text);
}
function tipo_consumivel()      // Verifica Tipo de Consumivel e envia para CLP
{
 var idx = Tipo_Consum.currentIndex;
 var qtd_aco;                   // Determina quais tipos de materiais: Carbono, Inox e Alumnio;

 var text = guiInterface("call::Tipo_Consum::itemText", idx);
 guiInterface("vars::string_value_write", "RES1__POU_DADOS_RECEITAS.CONSUMIVEL", text);

 Sel_material.clear();

 if (idx == 0)
  {                             // Cons. Fine Cut;
   // tela_2.hide();
   // tela_3.hide();
   // tela_1.show();
    tela_imagem_105.setCurrentIndex(0); // Fine
    qtd_aco = 1;
  }
 else
 if (idx == 1)
  {                             // Cons. 45A;
  //  tela_1.hide();
  //  tela_3.hide();
  //  tela_2.show();
    tela_imagem_105.setCurrentIndex(1); // 45 a 85
    qtd_aco = 2;
  }
 else
 if (idx == 2)
  {                             // Cons. 65A;
   // tela_1.hide();
   // tela_3.hide();
   // tela_2.show();
    tela_imagem_105.setCurrentIndex(1); // 45 a 85
    qtd_aco = 2;
  }
 else
 if (idx == 3)
  {                             // Cons. 85A;
  //  tela_1.hide();
  //  tela_3.hide();
  //  tela_2.show();
  tela_imagem_105.setCurrentIndex(1); // 45 a 85
    qtd_aco = 2;
  }
 else
 if (idx == 4)
  {                             // Cons. 105A;
  //  tela_1.hide();
  //  tela_2.hide();
  //  tela_3.show();              // Tabela 105A
  tela_imagem_105.setCurrentIndex(2); // 45 a 85
    qtd_aco = 2;
  }

   for(i=0; i<qtd_aco+1; i++)
       guiInterface("call::Sel_material::addItem", list_aco[i]);

}

function selecao_aco()           // Verifica Tipo de Aço e envia para CLP
{
 var idx = Tipo_Consum.currentIndex;
 var inicio;
 var fim;
 var  tipo_material = Sel_material.currentRow;

   guiInterface("vars::number_value_write", "RES1__POU_DADOS_RECEITAS.MATERIAL", tipo_material);

 Espessura.clear();

 if (idx == 0)
  {                             // Cons. Fine Cut;
    inicio = 0;
    fim = 5;
  }
 else
 if (idx == 1)
  {                             // Cons. 45A;
    if (guiInterface("vars::number_value_read", "RES1__POU_DADOS_RECEITAS.MATERIAL") != 2)
     {
      inicio = 0;
      fim = 6;
     }
    else
     {                        // Aluminio;
      inicio = 1;
      fim = 6;
     }
  }
 else
 if (idx == 2)
  {                             // Cons. 65A;
    if (guiInterface("vars::number_value_read", "RES1__POU_DADOS_RECEITAS.MATERIAL") != 0)
      {                        // Inox e Aluminio de 2 á 20
        inicio = 3;
        fim = 11;
      }
     else
      {                        // Carbo de 2 á 25
        inicio = 3;
        fim = 12;
      }
  }
 else
 if (idx == 3)
  {                             // Cons. 85A;
     if (guiInterface("vars::number_value_read", "RES1__POU_DADOS_RECEITAS.MATERIAL") != 0)
      {                         // Inox e Aluminio
        inicio = 4;
        fim = 12;
      }
     else
      {                        //  Carbono
        inicio = 4;
        fim = 13;
      }
  }
 else
 if (idx == 4)
  {                             // Cons. 105A;
     if (guiInterface("vars::number_value_read", "RES1__POU_DADOS_RECEITAS.MATERIAL") != 0)
      {                         // Inox e Aluminio
        inicio = 6;
        fim = 14;
      }
     else
      {                        // Carbono
        inicio = 6;
        fim = 15;
      }
  }

   for(i=inicio; i<fim+1; i++)
       guiInterface("call::Espessura::addItem", list[i]);
}

function carrega_dados()         // Confirmar dados em receita
{
    qhmiworkrecipes.loadRecipe();
}

function receita()
{
  var idx = qhmiworkrecipes.currentItemChanged;
  guiInterface("vars::number_value_write", "RES1__POU_DADOS_RECEITAS.ESPESSURA", idx);
}

function deter_esp()
{
 // inicia_banco = true;
 var idex = tabela_combo.currentIndex;
  guiInterface("vars::number_value_write", "RES1__POU_DADOS_RECEITAS.ESPESSURA", idex);
  guiInterface("vars::bool_value_write",  "RES1__POU_DADOS_RECEITAS.CHECK_DADOS", true);
}

function seleciona_espessura()   // Verifica a Espessura do Material e envia para CLP
{
  var idx = Espessura.currentRow;
  guiInterface("vars::number_value_write", "RES1__POU_DADOS_RECEITAS.ESPESSURA", idx);
  guiInterface("vars::bool_value_write",  "RES1__POU_DADOS_RECEITAS.CHECK_DADOS", true);
}
function load_valores()
{
   var corte_altura  = guiInterface("vars::double_value_read","CONF1_RECIPE_1");
   guiInterface("vars::double_value_write", "RES1__POU_THC_PLS_M3.POSICAO_CORTE", corte_altura);

   var perfuracao_altura = guiInterface("vars::double_value_read","CONF1_RECIPE_2");
   guiInterface("vars::double_value_write", "RES1__POU_THC_PLS_M3.POSICAO_PERFURACAO", perfuracao_altura);

   var perfuracao_tempo = guiInterface("vars::double_value_read","CONF1_RECIPE_3");
   guiInterface("vars::double_value_write", "CONF1_G_TP_PERFURACAO", perfuracao_tempo);

   var tensao_corte = guiInterface("vars::double_value_read","CONF1_RECIPE_4");
   guiInterface("vars::double_value_write", "CONF1_G_TENSAO_CORTE", tensao_corte);

   var repouso_altura = guiInterface("vars::double_value_read","CONF1_RECIPE_5");
   guiInterface("vars::double_value_write", "CONF1_POSICAO_REPOUSO", repouso_altura);

   var vel_corte = guiInterface("vars::double_value_read","CONF1_RECIPE_6");
   guiInterface("vars::double_value_write", "CONF1_G_B_VEL_WORK", vel_corte);
}

//this function is called on page load
function register(path)
{
 loadData();
 OK["clicked()"].connect(load_valores);
 Salvar["clicked()"].connect(salva_receita);
// Confirmar["clicked()"].connect(carrega_dados);
 Espessura["currentTextChanged(QString)"].connect(seleciona_espessura);
// Espessura.currentTextChanged(QString)
 //Espessura["currentRowChanged (int)"].connect(seleciona_espessura);
 Tipo_Consum["currentIndexChanged (QString)"].connect(tipo_consumivel);
 Fonte["currentIndexChanged (QString)"].connect(modelo_fonte);
 Sel_material["currentRowChanged (int)"].connect(selecao_aco);
 guiInterface("vars::add_variable", "RES1__POU_THC_PLS_M3.POSICAO_CORTE");
 guiInterface("vars::add_variable", "RES1__POU_THC_PLS_M3.POSICAO_PERFURACAO");
 guiInterface("vars::add_variable", "CONF1_G_TP_PERFURACAO");
 guiInterface("vars::add_variable", "CONF1_POSICAO_REPOUSO");
 guiInterface("vars::add_variable", "CONF1_G_B_VEL_WORK");
 guiInterface("vars::add_variable", "CONF1_G_TENSAO_CORTE");
 guiInterface("vars::add_variable", "CONF1_RECIPE_1");
 guiInterface("vars::add_variable", "CONF1_RECIPE_2");
 guiInterface("vars::add_variable", "CONF1_RECIPE_3");
 guiInterface("vars::add_variable", "CONF1_RECIPE_4");
 guiInterface("vars::add_variable", "CONF1_RECIPE_5");
 guiInterface("vars::add_variable", "CONF1_RECIPE_6");
 guiInterface("vars::add_variable", "RES1__POU_DADOS_RECEITAS.FONTE");
 guiInterface("vars::add_variable", "RES1__POU_DADOS_RECEITAS.CONSUMIVEL");
 guiInterface("vars::add_variable", "RES1__POU_DADOS_RECEITAS.MATERIAL");
 guiInterface("vars::add_variable", "RES1__POU_DADOS_RECEITAS.ESPESSURA");
 guiInterface("vars::add_variable", "RES1__POU_DADOS_RECEITAS.NOME");
 guiInterface("vars::add_variable", "RES1__POU_DADOS_RECEITAS.BIT_SALVA");
 guiInterface("vars::add_variable", "RES1__POU_DADOS_RECEITAS.CHECK_DADOS");
 guiInterface("vars::add_variable", "RES1__POU_DADOS_RECEITAS.READ_OK");
}

//this function is called on page unload
function unregister(path)
{
// Espessura["currentRowChanged (int)"].disconnect(seleciona_espessura);
 Espessura["currentTextChanged(QString)"].disconnect(seleciona_espessura);
 Tipo_Consum["currentIndexChanged (QString)"].disconnect(tipo_consumivel);
}

//called with timer_tick (ms) interval
function timer()
{
 /* if (guiInterface("vars::bool_value_READ", "RES1__POU_DADOS_RECEITAS.CHECK_DADOS") == true)
  {
    inicia_banco = true;
  }
 else
 if ((guiInterface("vars::bool_value_READ", "RES1__POU_DADOS_RECEITAS.CHECK_DADOS") == false) && (inicia_banco == true))
  {
      var nome = guiInterface("vars::string_value_read", "RES1__POU_DADOS_RECEITAS.NOME");
       qhmiworkrecipes.setRecipeName(nome);
       qhmiworkrecipes.loadRecipe();
       inicia_banco = false;
  }*/
}

//this function is called when registered variables change value
//vars is the array of ALL registered variables
//changed is the array of MODIFIED registered variables
//values are stored in vars and changed like strings
function values_changed(vars, changed)
{
var receita = guiInterface("vars::bool_value_READ", "RES1__POU_DADOS_RECEITAS.READ_OK");

   if (receita == true)
    {
      var nome = guiInterface("vars::string_value_read", "RES1__POU_DADOS_RECEITAS.NOME");
      qhmiworkrecipes.setRecipeName(nome);
      qhmiworkrecipes.loadRecipe();
      guiInterface("vars::bool_value_write",  "RES1__POU_DADOS_RECEITAS.READ_OK", false);
    }
}

