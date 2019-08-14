/*
to change dxf conversion behavior look at qHmiPreviewTable propertyes
for example
  - qHmiPreviewTable.useM4
    - true,  use "M4" G code
    - false, use "M3" G code
*/
var timer_tick = 500;

function selected_file(name)
{
  guiInterface("vars::string_value_write", "RES1__POU_SLOW_CNC.SOURCE_FILENAME", name);
}

function selected_name(name)
{
  guiInterface("vars::string_value_write", "RES1__POU_SLOW_CNC.CNC_FILENAME", name);
  guiInterface("vars::bool_value_write", "CONF1__CNC_PARSER_FB.EXECUTE", "true");
  guiInterface("vars::bool_value_write", "RES1__POU_SLOW_CNC.B_CNC_RESET", "true");
}

function register(path)
{
  if (0 && osWindows)
    debugger;
  qHmiPreviewTable["selected_name(QString)"].connect(selected_name);
  qHmiPreviewTable["selected_file(QString)"].connect(selected_file);
  guiInterface("vars::add_variable", "RES1__POU_SLOW_CNC.CNC_FILENAME");
  guiInterface("vars::add_variable", "CONF1__CNC_PARSER_FB.EXECUTE");
  guiInterface("vars::add_variable", "RES1__POU_SLOW_CNC.B_CNC_RESET");
  guiInterface("vars::add_variable", "RES1__POU_SLOW_CNC.SOURCE_FILENAME");
  guiInterface("vars::add_variable", "RES1__POU_SLOW_CNC.SHAPE_EXECUTE");
}

function unregister(path)
{
}

function timer()
{
}

function values_changed(vars)
{
}