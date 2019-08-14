//function timer interval
var timer_tick = 500;

//this function is called on page load
function register(path)
{
  guiInterface("vars::add_variable", "CONF1__CNC_EXEC_FB.ACTIVE");
}

//this function is called on page unload
function unregister(path)
{
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
  if (guiInterface("vars::bool_value_READ", "CONF1__CNC_EXEC_FB.ACTIVE") == false)
  {
    QHmiLinkPageSelectWork.enabled     = true;
    QHmiButtonResetWork.enabled        = true;
    QHmiButtonResetMotionState.enabled = true;
  }
  else
  {
    QHmiLinkPageSelectWork.enabled     = false;
    QHmiButtonResetWork.enabled        = false;
    QHmiButtonResetMotionState.enabled = false;
  }
}

