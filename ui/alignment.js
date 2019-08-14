//function timer interval
var timer_tick = 500;
var items_list = [];
var cellData = "";
var indice = 0;
var rotation = 0.0;
var p1_x = 0.0, p1_y = 0.0;
var p2_x = 0.0, p2_y = 0.0;
var draw_handle = false;
var r_size_x = 0.0;
var r_size_y = 0.0;
var actSpaX = 0.0;
var actSpaY = 0.0;
var spaX = 0.0;
var spaY = 0.0;
var radius;
var first = true;

function qHmiCanvas_paintEvent()
{
  items_list = [];
  indice = 0;

  cellData = "setBrush black solidpattern";
  items_list[indice ++] = cellData;
  cellData = "setPen white";
  items_list[indice ++] = cellData;
  cellData = "fillRect 0 0 " + qHmiCanvas.width + " " + qHmiCanvas.height;
  items_list[indice ++] = cellData;

  cellData = "setRotation " + rotation;
  items_list[indice ++] = cellData;

  cellData = "setPen red 2";
  items_list[indice ++] = cellData;

  cellData = "line 0 0 " + r_size_x + " 0";
  items_list[indice ++] = cellData;
  cellData = "line " + r_size_x + " 0 " + r_size_x + " " + r_size_y;
  items_list[indice ++] = cellData;
  cellData = "line " + r_size_x + " " + r_size_y + " 0 " + r_size_y;
  items_list[indice ++] = cellData;
  cellData = "line 0 " + r_size_y + " 0 0";
  items_list[indice ++] = cellData;

  cellData = "setPen yellow 2";
  items_list[indice ++] = cellData;
  cellData = "arc " + actSpaX + " " + actSpaY + " " + radius + " 0 360";
  items_list[indice ++] = cellData;

  if (draw_handle)
  {
    cellData = "setRotation 0.0";
    items_list[indice ++] = cellData;

    cellData = "setPen yellow";
    items_list[indice ++] = cellData;

    cellData = "line 0 0 " + (actSpaX - p1_x) + " " + (actSpaY - p1_y);
    items_list[indice ++] = cellData;
  }

  return items_list;
}

function apply()
{
  guiInterface("vars::double_value_write", "RES1__POU_SLOW_CNC.R_ROTATE", rotation);
  guiInterface("vars::bool_value_write", "RES1__POU_SLOW_CNC.B_CNC_RESET", "true");
  QHmiLinkPage.click();
}

function reset()
{
  toolButtonP1.checked = false;
  toolButtonP2.checked = false;
  toolButtonP3.checked = false;
  draw_handle = false;
  rotation = 0.0;
  actSpaX = 0.0;
  actSpaY = 0.0;
  spaX = guiInterface("vars::double_value_read", "CONF1_AXIS_X.ABSPOS");
  spaY = guiInterface("vars::double_value_read", "CONF1_AXIS_Y.ABSPOS");
  qHmiCanvas.redraw = true;
}

function rad2gr(y)
{
  return (y * 180.0) / Math.PI;
}

function calc_rotation()
{
  if (toolButtonP2.checked)
  {
    if (p2_x - p1_x)
    {
      rotation = rad2gr(Math.atan((p2_y - p1_y) / (p2_x - p1_x)));
      if (p2_x < p1_x)
        rotation = 90 + rotation;
      else
        rotation = -90 + rotation;

      qHmiCanvas.redraw = true;
    }
  }
  else if (toolButtonP3.checked)
  {
    if (p2_y - p1_y)
    {
      rotation = rad2gr(Math.atan((p2_x - p1_x) / (p2_y - p1_y)));
      if (p2_x > p1_x)
      {
        if (p2_y < p1_y)
          rotation = -(90 + rotation);
        else
          rotation = 90 - rotation;
      }
      else
      {
        if (p2_y > p1_y)
          rotation = -(90 + rotation);
        else
          rotation = 90 - rotation;
      }

      qHmiCanvas.redraw = true;
    }
  }
}

function p1()
{
  p1_x = actSpaX;
  p1_y = actSpaY;
  draw_handle = true;
}

function p2()
{
  p2_x = actSpaX;
  p2_y = actSpaY;

  calc_rotation();

  toolButtonP1.checked = false;
  toolButtonP2.checked = false;
  toolButtonP3.checked = false;
  draw_handle = false;
}

//this function is called on page load
function register(path)
{
  draw_handle = false;
  rotation = 0.0;

  toolButtonP1.checked = false;
  toolButtonP2.checked = false;
  toolButtonP3.checked = false;

  guiInterface("vars::add_variable", "CONF1_AXIS_X.ABSPOS");
  guiInterface("vars::add_variable", "CONF1_AXIS_Y.ABSPOS");
  guiInterface("vars::add_variable", "RES1__POU_SLOW_CNC.R_SIZE_X");
  guiInterface("vars::add_variable", "RES1__POU_SLOW_CNC.R_SIZE_Y");
  guiInterface("vars::add_variable", "RES1__POU_SLOW_CNC.R_ROTATE");
  guiInterface("vars::add_variable", "RES1__POU_SLOW_CNC.B_CNC_RESET");

  toolButtonApply["clicked(bool)"].connect(apply);
  toolButtonReset["clicked(bool)"].connect(reset);
  toolButtonP1["toggled(bool)"].connect(p1);
  toolButtonP2["toggled(bool)"].connect(p2);
  toolButtonP3["toggled(bool)"].connect(p2);
}

//this function is called on page unload
function unregister(path)
{
  toolButtonApply["clicked(bool)"].disconnect(apply);
  toolButtonReset["clicked(bool)"].disconnect(reset);
  toolButtonP1["toggled(bool)"].disconnect(p1);
  toolButtonP2["toggled(bool)"].disconnect(p2);
  toolButtonP3["toggled(bool)"].disconnect(p2);
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
  if (first)
  {
    spaX = guiInterface("vars::double_value_read", "CONF1_AXIS_X.ABSPOS");
    spaY = guiInterface("vars::double_value_read", "CONF1_AXIS_Y.ABSPOS");
    first = false;
  }
  else
  {
    var now = guiInterface("vars::double_value_read", "CONF1_AXIS_X.ABSPOS");
    actSpaX = (now - spaX);
    now = guiInterface("vars::double_value_read", "CONF1_AXIS_Y.ABSPOS");
    actSpaY = (now - spaY);
  }

  r_size_x = guiInterface("vars::double_value_read", "RES1__POU_SLOW_CNC.R_SIZE_X");
  r_size_y = guiInterface("vars::double_value_read", "RES1__POU_SLOW_CNC.R_SIZE_Y");

  if (r_size_x > r_size_y)
    radius = r_size_x * 0.02;
  else
    radius = r_size_y * 0.02;

  qHmiCanvas.redraw = true;
}
