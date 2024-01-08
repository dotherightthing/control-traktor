# https://www.reddit.com/r/MacOS/comments/il8x0y/comment/jg55oip
on run
  tell application "System Settings"
    activate
    reveal pane id "com.apple.Displays-Settings.extension"
    delay 1
  end tell
  
  tell application "System Events"
    click pop up button 1 of group 1 of group 2 of splitter group 1 of group 1 of first window of application process "System Settings"
    click last menu item of first menu of pop up button 1 of group 1 of group 2 of splitter group 1 of group 1 of first window of application process "System Settings"
  end tell
  
  tell application "System Settings" to quit
end run
