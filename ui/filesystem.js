//function timer interval
var timer_tick = 500;

function copy_callback(percent)
{
  progressBar.setValue(percent);
}

function buttonCliched()
{
  var selections = qHmiFileSystem.selection();

  var to = typeof selections;

  if (to != "undefined")
  {
    if (selections.length)
    {
      var fileName = selections[0];
      if (fileName.length)
      {
         /*
           if we have selected a file on an USB pen drive,
           copy the selected file locally, "/SiriusApplicat/DATA/sda.cnc"
         */
         if (fileName.indexOf("/SiriusApplicat/DATA/drawings") < 0)
         {
           var file = guiInterface("QFile::register", "/SiriusApplicat/DATA/sda.cnc");
           if (guiInterface("QFile::exists", file))
               guiInterface("QFile::remove", file);
           guiInterface("QFile::unregister", file);

           file = guiInterface("QFile::register", fileName);
           progressBar.show();
           var result = guiInterface("QFile::copy", file, "/SiriusApplicat/DATA/sda.cnc", "copy_callback");
           progressBar.hide();
           guiInterface("QFile::unregister", file);
           fileName = "/SiriusApplicat/DATA/sda.cnc";
         }
         guiInterface("vars::string_value_write", "RES1__POU_SLOW_CNC.CNC_FILENAME", fileName);
         // start the PLC parsing process, refer to POU "slow_cnc"
         guiInterface("vars::bool_value_write", "CONF1__CNC_PARSER_FB.EXECUTE", "true");
         
         guiInterface("vars::bool_value_write", "RES1__POU_SLOW_CNC.B_CNC_RESET", "true");
         
         guiInterface("system::linkPage", "");
      }
    }
  }
}

//this function is called on page load
function register(path)
{
  progressBar.hide();
  pushButtonSelect["clicked()"].connect(buttonCliched);

  guiInterface("vars::add_variable", "RES1__POU_SLOW_CNC.CNC_FILENAME");
  guiInterface("vars::add_variable", "CONF1__CNC_PARSER_FB.EXECUTE");
  guiInterface("vars::add_variable", "RES1__POU_SLOW_CNC.B_CNC_RESET");
}

//this function is called on page unload
function unregister(path)
{
  pushButtonSelect["clicked()"].disconnect(buttonCliched);
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
  var name = guiInterface("vars::string_value_read", "RES1__POU_SLOW_CNC.CNC_FILENAME");
  qHmiFileSystem.setName(name);
}

function on_change_form(form)
{
}

function on_leave_form(form)
{
}

