function parseInput(input,chan,network,userCommand){
	chan = HTML.decodeParm(chan);
	if(input == "") return;
	var co = channel(chan,network);
	var bits = input.substr(1).split(" ");
	var UC = bits[0].toUpperCase();
	var sock = socket.getSocketByID(network);
	var nick = sock.networkInfo.nick;
	var color = $("div.user:iAttrContains('nick','" + nick.toLowerCase() + "')").css("color");
	var type = co.object.attr("type");
	co.object.find("input.channel_input").val("");
	
	
	if( input.substr(0,1) == "/" ){
		
		switch(UC){
			
			case "LIST":
				openWin("chanlist/index.html", "width=700,height=500");
				break;
			
			case "AWAY":
				socket.sendData(bits[0].toUpperCase() + " :" + getAfter(1), network);
				break;
				
			case "BAN":
				if(pCount(1)){
					if(type == "channel"){
						socket.sendData("MODE " + chan + " +b " + bits[1], network);
					}else{
						co.addInfo("Not a channel window", "error-info");
					}
				}
				break;
				
			case "CLEAR":
				co.object.find("div.channel_content").html("");
				break;
			case "CLOSE":
				co.close();
				break;
			case "CTCP":
				if(pCount(1)){
					if(bits.length == 2){
						socket.sendData("PRIVMSG " + chan + " :" + String.fromCharCode(1) + bits[1] + String.fromCharCode(1), network);
					}else{
						socket.sendData("PRIVMSG " + bits[1] + " :" + String.fromCharCode(1) + bits[2] + String.fromCharCode(1), network);
					}
				}
				break;
			case "CYCLE":
				socket.sendData("PART " + chan, network);
				socket.sendData("JOIN " + chan, network);
				break;
			
			case "DEV":
				remote.getCurrentWindow().toggleDevTools();
				break;
			
			case "ECHO":
				co.addInfo(getAfter(1));
				break;
				
			case "HOP":
				if(pCount(1)){
					if(type == "channel"){
						socket.sendData("MODE " + chan + " +h " + bits[1], network);
					}else{
						co.addInfo("Not a channel window", "error-info");
					}
				}
				break;		
				
			case "KICKBAN":
				if(pCount(1)){
					if(type == "channel"){
						socket.sendData("MODE " + chan + " +b " + bits[1] + "!*@*", network);
						socket.sendData("KICK " + chan + " " + bits[1], network);
					}else{
						co.addInfo("Not a channel window", "error-info");
					}
				}
				break;
				
				
			case "KICK":
				if(pCount(1)){
					if(type == "channel"){
						socket.sendData("KICK " + chan + " " + bits[1], network);
					}else{
						co.addInfo("Not a channel window", "error-info");
					}
				}
				break;
				
			case "JOIN":
				if( bits.length < 2 ){
					co.addInfo(UC + " expects more parameters", "error-info");
					return;
				}
				socket.sendData(UC + " " + getAfter(1), network);
				break;
				
			case "MODE":
				
					if(type == "channel"){
						socket.sendData("MODE " + chan + " " + getAfter(1), network);
					}else{
						socket.sendData("MODE " + nick + " " + getAfter(1), network);
					}
				
				break;
				
			case "MSG":
			case "QUERY":
				if(pCount(1)){
					if(bits.length == 2){
						channel(bits[1], id).create("new_pm_window");
					}else{
						socket.sendData("PRIVMSG " + bits[1] + " :" + getAfter(2), network);
					}
				}
				break;
				
			case "NOTICE":
				if(pCount(2)){
					socket.sendData("NOTICE " + bits[1] + " :" + getAfter(2), network);
				}
				break;
				
			case "OP":
				if(pCount(1)){
					if(type == "channel"){
						socket.sendData("MODE " + chan + " +o " + bits[1], network);
					}else{
						co.addInfo("Not a channel window", "error-info");
					}
				}
				break;
				
			case "PART":
				if( bits.length < 2 ){
					co.addInfo(UC + " expects more parameters", "error-info");
					return;
				}else if( bits.length == 2 ){
					socket.sendData(UC + " " + getAfter(1), network);
				}else{
					socket.sendData(UC + " " + bits[1] + " :" + getAfter(2), network);
				}
				break;
				
			case "QUIET":
				if(pCount(1)){
					if(type == "channel"){
						socket.sendData("MODE " + chan + " +q " + bits[1], network);
					}else{
						co.addInfo("Not a channel window", "error-info");
					}
				}
				break;
				
			case "QUOTE":
			case "RAW":
				if(pCount(1)){
					socket.sendData(getAfter(1), network);
				}
				break;
				
			case "QUIT":
				if(pCount(1)){
					socket.sendData(getAfter(1), network);
				}
				break;
				
			case "ME":
			case "ACTION":
				if( bits.length < 2 ){
					co.addInfo(UC + " expects more parameters", "error-info");
					return;
				}else{
					socket.sendData("PRIVMSG " + chan + " :" + String.fromCharCode(1) + "ACTION " + getAfter(1) + String.fromCharCode(1), network);
					co.addAction(nick, "*!*@*", color, false, getAfter(1));
					return;
				}
				break;
				
				
			case "TOPIC":
				if(pCount(1)){
					if(type == "channel"){
						socket.sendData("TOPIC " + chan + " :" + getAfter(1), network);
					}else{
						co.addInfo("Not a channel window", "error-info");
					}
				}
				break;	

			case "UNBAN":
				if(pCount(1)){
					if(type == "channel"){
						socket.sendData("MODE " + chan + " -b " + bits[1], network);
					}else{
						co.addInfo("Not a channel window", "error-info");
					}
				}
				break;	

			case "UNQUIET":
				if(pCount(1)){
					if(type == "channel"){
						socket.sendData("MODE " + chan + " -q " + bits[1], network);
					}else{
						co.addInfo("Not a channel window", "error-info");
					}
				}
				break;	

			case "VOICE":
				if(pCount(1)){
					if(type == "channel"){
						socket.sendData("MODE " + chan + " +v " + bits[1], network);
					}else{
						co.addInfo("Not a channel window", "error-info");
					}
				}
				break;	

			case "DEVOICE":
				if(pCount(1)){
					if(type == "channel"){
						socket.sendData("MODE " + chan + " -v " + bits[1], network);
					}else{
						co.addInfo("Not a channel window", "error-info");
					}
				}
				break;	

			case "DEOP":
				if(pCount(1)){
					if(type == "channel"){
						socket.sendData("MODE " + chan + " -o " + bits[1], network);
					}else{
						co.addInfo("Not a channel window", "error-info");
					}
				}
				break;		

			case "DEHOP":
				if(pCount(1)){
					if(type == "channel"){
						socket.sendData("MODE " + chan + " -h " + bits[1], network);
					}else{
						co.addInfo("Not a channel window", "error-info");
					}
				}
				break;		

			case "IGNORE":
				if(pCount(1)){
					var is = getAfter(1);
					if(is.slice(0,1) == "/" && is.slice(-1) == "/"){
						if( ignore.add("regex", is.slice(1,-1)) ){
							co.addInfo("Regex value \"" + is + "\" added to ignore list", "error-info");
						}else{
							co.addInfo("Regex value is already ignored", "error-info");
						}
					}else{
						if( is.indexOf("!") == -1 ) is = is + "!*@*";
						if( ignore.add("user", is) ){
							co.addInfo("User string \"" + is + "\" added to ignore list", "error-info");
						}else{
							co.addInfo("User string is already ignored", "error-info");
						}
					}
				}
				break;	
			
			case "UNIGNORE":
				if(pCount(1)){
					var is = getAfter(1);
					if(is.slice(0,1) == "/" && is.slice(-1) == "/"){
						if( ignore.remove("regex", is.slice(1,-1)) ){
							co.addInfo("Regex value \"" + is + "\" was removed from the ignore list", "error-info");
						}else{
							co.addInfo("Regex value not ignored", "error-info");
						}
					}else{
						if( is.indexOf("!") == -1 ) is = is + "!*@*";
						if( ignore.remove("user", is) ){
							co.addInfo("User string \"" + is + "\" was removed from the ignore list", "error-info");
						}else{
							co.addInfo("User string not ignored", "error-info");
						}
					}
				}
				break;
			case "SYSINFO":
				var sinfo = sysinfo();
				socket.sendData("PRIVMSG " + chan + " :" + sinfo, network);
				co.addPrivmsg(nick, "*!*@*", color, false, sinfo);
				
				break;
			case "VERSION":
				if(pCount(1)){
					socket.sendData("PRIVMSG " + bits[1] + " :" + String.fromCharCode(1) + "VERSION" + String.fromCharCode(1), network);
				}
				break;
				
			
			
			default:
				if(userCommand==true || !parseUserCommand()) socket.sendData(input.substr(1), network);
		}
		
	}else{
		if(chan == "network console"){
			co.addInfo("This is the network console, you can't send messages here. For a list of command try /help.");
		}else{
			socket.sendData( "PRIVMSG " + chan + " :" + input, network );
			co.addPrivmsg(nick, "*!*@*", color, false, input);
		}
	}
	
	function pCount(e){
		if((bits.length - 1) >= e){
			return true;
		}else{
			co.addInfo(UC + " expects more parameters", "error-info");
			return false;
		}
	}
	
	function getAfter(e){
		//gets data after input segment
		var start = 0;
		for (var i = 0; i < e; i++) { 
			start += (bits[i].length + 1);
		}
		return input.substr(start + 1);
	}
	
	
	function parseUserCommand(){
		
		var uc = config.userCommands;
		var d = new Date();
		for( var i in uc ) {
			if( uc[i].command.toUpperCase() == UC ){
				var action = uc[i].action;
				action = action.replace( /\%c/g, chan );
				action = action.replace( /\%e/g, sock.networkInfo.getISUPPORT("network") );
				action = action.replace( /\%n/g, sock.networkInfo.nick );
				action = action.replace( /\%v/g, appVersion );
				action = action.replace( /\%t/g, d.toTimeString() );
				action = action.replace( /\%d/g, d.toLocaleDateString() );
				action = wordToEnd( action, input );
				input = "/" + action;
				parseInput(input,chan,network,true);
				return true;
			}
		}
		return false; /* if false is returned then no user command was processed */

		function wordToEnd( i, z ){
			var words = ( "undefined " + z ).split( " " ); /* add undefined to pad the indexes out, making 1 the first word */
			for (a = 1; a < 9; a++) { 
				if( i.indexOf( "&" + a ) > -1 ) {
					var start = 0;
					for (b = 1; b < a; b++) { 
						start += words[b].length + 1;
					}
					for (k = 0; k < 9; k++) { 
						i = i.replace( "&" + a, z.substr( start ) );
						i = i.replace( "%" + a, words[a] );
					}
				}
			}
			return i;
		}

	}
}

