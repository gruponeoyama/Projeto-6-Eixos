#!/bin/sh

CALIBRATE_FILE=/etc/pointercal
PWD_FILE=/etc/hmipwd

#------
# MAIN
#------
if [ ! -f $PWD_FILE ]; then
  echo "0cec47256b399b2cc2686994d8ef7faebc792081" >  $PWD_FILE
  echo "a3bb8f8e29b94fa6ebd88821313e6327c1d8339e" >> $PWD_FILE
  echo "35b90d51969a4633a5bb5a9a1564bb3ae7938deb" >> $PWD_FILE
fi

board_name=$(fw_printenv board_name | cut -c 12-)
if [ "$board_name" != "DEC-A" ]; then
	
	if [ ! -f $CALIBRATE_FILE ]; then
  		/usr/bin/ts_calibrate > /tmp/ts_calibrate.txt
	fi

	if [ $? -ne "0" ]; then
  		echo "Touchscreen calibration error!"
  		echo " --> Check if touchscreen device cable is correctly connected"
	fi

	POINTERCAL_SIZE=`du $CALIBRATE_FILE | cut -f 1`

	if [ $POINTERCAL_SIZE -le 0 ]; then
  		rm $CALIBRATE_FILE
  		/usr/bin/ts_calibrate > /tmp/ts_calibrate.txt
	fi
  
  show_cursor=
else
  show_cursor="-c"
fi

/SiriusApplicat/hmid.elf -qws -f -U/SiriusApplicat/ui -Sdefault $show_cursor