//function timer interval
var timer_tick = 500;
var check_modo;
var bfirst = 0;
var dados_maquina;

function openLaser()  // Botão Laser Poiter;
{
   var flag_laser = guiInterface("vars::bool_value_READ", "CONF1_G_B_LASER_POINTER");

  if (flag_laser == false)
    {
      guiInterface("vars::bool_value_write",  "CONF1_G_B_LASER_POINTER", true);
      Laser_Pointer.styleSheet = "background-color: rgb(0,85,0);";
      Laser_Pointer.text = "Laser Pointer\n Ligado";
    }
  else
    {
      guiInterface("vars::bool_value_write",  "CONF1_G_B_LASER_POINTER", false);
      Laser_Pointer.styleSheet = "background-color: rgb(27, 27, 27);";
      Laser_Pointer.text = "Laser Pointer\n Desligado";
    }
}

function openCorte()  // Botão corte Manual
{
 var flag_corte = guiInterface("vars::bool_value_READ", "CONF1_BT_CORTE_MANUAL");

  if (flag_corte == false)
    {
      guiInterface("vars::bool_value_write",  "CONF1_BT_CORTE_MANUAL", true);
      Corte_Manual_2.styleSheet = "background-color: rgb(0,85,0);";
      Corte_Manual_2.text = "Corte Manual\n Ligado";
    }
  else
    {
      guiInterface("vars::bool_value_write",  "CONF1_BT_CORTE_MANUAL", false);
      Corte_Manual_2.styleSheet = "background-color: rgb(27, 27, 27);";
      Corte_Manual_2.text = "Corte Manual\n Desligado";
    }
}

function openClicked()
{

 var idx = tela_vel_dados.currentIndex;
    if (idx == 0)
     {
      tela_vel_dados.setCurrentIndex(1);
     }
    else
    if (idx == 1)
     {
       tela_vel_dados.setCurrentIndex(0);
     }
}

function reset_alarmes()
{
  guiInterface("vars::bool_value_write", "CONF1_G_B_RESET_ALARMS", true);
  guiInterface("vars::bool_value_write", "CONF1_G_B_RESET_AXIS", true);
}

// Botão Seleciona Modo de Trabalho
function tipo_trabalho()

{
     if (guiInterface("vars::number_value_read", "CONF1_G_INT_SELECIONA") == 0)
      {
        modo_trabalho.setCurrentIndex(0); // SIMULACAO
        guiInterface("vars::number_value_write", "CONF1_G_INT_SELECIONA", 1);
      }
      else if (guiInterface("vars::number_value_read", "CONF1_G_INT_SELECIONA") == 1)
      {
        modo_trabalho.setCurrentIndex(1); // PLASMA
        guiInterface("vars::number_value_write", "CONF1_G_INT_SELECIONA", 2);
      }
      else if (guiInterface("vars::number_value_read", "CONF1_G_INT_SELECIONA") == 2)
      {
        if(guiInterface("vars::bool_value_READ", "CONF1_G_B_MODO_OXICORTE") == true)
         {
           modo_trabalho.setCurrentIndex(2); // OXICORTE
           guiInterface("vars::number_value_write", "CONF1_G_INT_SELECIONA", 0);
         }
        else
         {
           modo_trabalho.setCurrentIndex(0); // SIMULACAO
           guiInterface("vars::number_value_write", "CONF1_G_INT_SELECIONA", 1);
         }
      }
}


//this function is called on page load
function register(path)
{
  guiInterface("vars::add_variable", "CONF1__CNC_EXEC_FB.ACTIVE");
  guiInterface("vars::add_variable", "CONF1_G_INT_SELECIONA");
  guiInterface("vars::add_variable", "CONF1_G_B_AVANT_VELOCE");
  guiInterface("vars::add_variable", "CONF1_G_B_RECUA_VELOCE");
  guiInterface("vars::add_variable", "CONF1_G_B_CORTE_2D");
  guiInterface("vars::add_variable", "CONF1_G_B_MODO_OXICORTE");
  Modo["clicked()"].connect(tipo_trabalho);
  bt_maquina["clicked()"].connect(openClicked);
  Reset_Axes["clicked()"].connect(reset_alarmes);
  Corte_Manual_2["clicked()"].connect(openCorte);
  Laser_Pointer["clicked()"].connect(openLaser);
  guiInterface("vars::add_variable", "CONF1_OPENDIALOG");
  guiInterface("vars::add_variable","CONF1_G_B_RESET_ALARMS");
  guiInterface("vars::add_variable","CONF1_G_B_RESET_AXIS");
  guiInterface("vars::add_variable","CONF1_BT_CORTE_MANUAL");
  guiInterface("vars::add_variable","CONF1_G_B_LASER_POINTER");

 // modo_trabalho.setCurrentIndex("CONF1_G_INT_SELECIONA");
 // Avanca["clicked(bool)"].connect(avanca_percurso);
}

//this function is called on page unload
function unregister(path)
{
  Modo["clicked()"].disconnect(tipo_trabalho);
  bt_maquina["clicked()"].disconnect(openClicked);
  Corte_Manual_2["clicked()"].disconnect(openCorte);
  Laser_Pointer["clicked()"].disconnect(openLaser);
//  bt_dados["clicked()"].disconnect(openClicked);
 // modo_trabalho.setCurrentIndex("CONF1_G_INT_SELECIONA");
}

//called with timer_tick (ms) interval
function timer()
{
   if(guiInterface("vars::bool_value_READ", "CONF1_G_B_LASER_POINTER") == false)
     {
      Laser_Pointer.styleSheet = "background-color: rgb(27, 27, 27);";
      Laser_Pointer.text = "Laser Pointer\n Desligado";
     }
    else
     {
      Laser_Pointer.styleSheet = "background-color: rgb(0,85,0);";
      Laser_Pointer.text = "Laser Pointer\n Ligado";
     }
}

//this function is called when registered variables change value
//vars is the array of ALL registered variables
//changed is the array of MODIFIED registered variables
//values are stored in vars and changed like strings
function values_changed(vars, changed)
{
// check_modo = guiInterface("vars::number_value_read", "CONF1_G_INT_SELECIONA");
  if(guiInterface("vars::bool_value_READ", "CONF1__CNC_EXEC_FB.ACTIVE") == false)
   {
      QHmiLinkPage_14.visible     = true;
      QHmiButtonResetWork.enabled = true;
      Reset_Axes.enabled          = true;
   }
  else
   {
      QHmiLinkPage_14.visible     = false;
      QHmiButtonResetWork.enabled = false;
      Reset_Axes.enabled          = false;
   }

  if (!bfirst)
   {

   if(guiInterface("vars::bool_value_READ", "CONF1_BT_CORTE_MANUAL") == false)
     {
       Corte_Manual_2.styleSheet = "background-color: rgb(27, 27, 27);";
       Corte_Manual_2.text = "Corte Manual\n Desligado";
     }
   else
     {
       Corte_Manual_2.styleSheet = "background-color: rgb(0,85,0);";
       Corte_Manual_2.text = "Corte Manual\n Ligado";
     }

  /*  if(guiInterface("vars::bool_value_READ", "CONF1_G_B_LASER_POINTER") == false)
     {
      Laser_Pointer.styleSheet = "background-color: rgb(27, 27, 27);";
      Laser_Pointer.text = "Laser Pointer\n Desligado";
     }
    else
     {
      Laser_Pointer.styleSheet = "background-color: rgb(0,85,0);";
      Laser_Pointer.text = "Laser Pointer\n Ligado";
     }*/

     if (guiInterface("vars::number_value_read", "CONF1_G_INT_SELECIONA") == 0)
      {
        modo_trabalho.setCurrentIndex(2);
      }
     else if (guiInterface("vars::number_value_read", "CONF1_G_INT_SELECIONA") == 1)
      {
        modo_trabalho.setCurrentIndex(0);
      }
     else if (guiInterface("vars::number_value_read", "CONF1_G_INT_SELECIONA") == 2)
      {
        modo_trabalho.setCurrentIndex(1);
      }
     bfirst = true;
   }

  /* if(changed["CONF1_OPENDIALOG"] == "TRUE")
    {
      guiInterface("vars::bool_value_write", "CONF1_OPENDIALOG", false);
      guiInterface("system::linkPage", "dados_corte.ui");
    }*/
}
