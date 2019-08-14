//function timer interval
var timer_tick = 500;
var bfirst = 0;

function tipo_trabalho()

{
     if (guiInterface("vars::number_value_read", "CONF1_G_INT_SELECIONA") == 0)
      {
        modo_trabalho.setCurrentIndex(0);
        guiInterface("vars::number_value_write", "CONF1_G_INT_SELECIONA", 1);
      }
      else if (guiInterface("vars::number_value_read", "CONF1_G_INT_SELECIONA") == 1)
      {
        modo_trabalho.setCurrentIndex(1);
        guiInterface("vars::number_value_write", "CONF1_G_INT_SELECIONA", 0);
      }
     /* else if (guiInterface("vars::number_value_read", "CONF1_G_INT_SELECIONA") == 2)
      {
        modo_trabalho.setCurrentIndex(2);
        guiInterface("vars::number_value_write", "CONF1_G_INT_SELECIONA", 0);
      }*/
}

//this function is called on page load
function register(path)
{
  guiInterface("vars::add_variable", "CONF1__CNC_EXEC_FB.ACTIVE");
  guiInterface("vars::add_variable", "CONF1_G_INT_SELECIONA");
  Modo["clicked()"].connect(tipo_trabalho);
}
//this function is called on page unload
function unregister(path)
{
 Modo["clicked()"].disconnect(tipo_trabalho);
}

//called with timer_tick (ms) interval
function timer()
{
}

//this function is called when registered variables change value
//vars is the array of ALL registered variables
//changed is the array of MODIFIED registered variables
//values are stored in vars and changed like strings
function values_changed(vars, changed)
{
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
     if (guiInterface("vars::number_value_read", "CONF1_G_INT_SELECIONA") == 0)
      {
        modo_trabalho.setCurrentIndex(1);
      }
     else if (guiInterface("vars::number_value_read", "CONF1_G_INT_SELECIONA") == 1)
      {
        modo_trabalho.setCurrentIndex(0);
      }
   /*  else if (guiInterface("vars::number_value_read", "CONF1_G_INT_SELECIONA") == 2)
      {
        modo_trabalho.setCurrentIndex(1);
      }
     bfirst = true;*/
   }

}


