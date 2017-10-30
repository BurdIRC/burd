var switcher = {
	current: 0,
	channel: 0,
	find: function( socket, channel ) {
		channel = channel.toLowerCase();
		this.current = $("div.server-list[socket='" + socket + "'] ul li[channel='" + base64.encode( channel.toLowerCase() ) + "']:first");
		this.channel = $("div.right-content[socket='" + socket + "'][channel='" + base64.encode( channel.toLowerCase() ) + "']:first");
		return this;
	},
	findByChannelObj: function( obj ){
		this.current = $("div.server-list[socket='" + obj.attr("socket") + "'] ul li[channel='" + obj.attr("channel") + "']");
		this.channel = obj;
		return this;
	},
	markUnread: function(){
		if( !this.current.hasClass( "selected" ) ) this.current.addClass( "unread" );
	},
	close: function(){
		this.current.remove();
		this.channel.remove();
	},
	show: function(){
		$("div.server-list ul li").removeClass( "selected" );
		this.current.addClass( "selected" );
		this.current.removeClass( "unread" ).removeClass( "highlight" );
		$("div.right-content:visible").hide();
		this.channel.show();
		$("input.user-input:visible:first").focus();
		ui.resize();
	},
	highlight: function(){
		if( !this.current.hasClass( "selected" ) ) this.current.addClass( "highlight" );
	},
	nextChannel: function(){
		var e = $( "div#right-content div.channel:visible" );
		if( e.length > 0 ){
			if( e.next().length > 0 ){
				switcher.findByChannelObj( e.next() ).show();
			}else{
				switcher.findByChannelObj( $( "div#right-content div.channel:first" ) ).show();
			}
		}
	},
	prevChannel: function(){
		var e = $( "div#right-content div.channel:visible" );
		if( e.length > 0 ){
			if( e.next().length > 0 ){
				switcher.findByChannelObj( e.prev() ).show();
			}else{
				switcher.findByChannelObj( $( "div#right-content div.channel:last" ) ).show();
			}
		}
	}
}


var base64 = {
	encode: function(e){
		return btoa(e);
	},
	decode: function(e){
		return atob(e);
	}
}


// switcher.find(socketID, "#wow").show();