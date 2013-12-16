function Calendar(yourDate, chooseDate, inputElement) {
		this.container = document.createElement('div');
		this.container.className = 'show';
		this.currentDate = yourDate;
		this.chooseDate = chooseDate;
		this.showDate = eval(uneval(this.currentDate));
		this.myNumber = [];

		this.Generate = function() {
			var i = eval(uneval(this.showDate));
			var left = 0;
			var right = 100;
			var m = i.getMonth();			
			i.setDate(1);
			i.setDate(1-(i.getDay()+6)%7);			
			var buffer = "<table class=z_ch_m><tr><td class=z_l_c>◄</td><th>"+this.showDate.toLocaleString().split(' ')[1] + " " +this.showDate.getFullYear()+"</th><td class=z_r_c>►</td></tr></table>";
			buffer += "<table class=zcn><tr>";
			var l = 0;
			while(l < 42) {
				var classn= "z_t";
				if((i-this.currentDate) / 86400000 < -left) classn = "z_d";
				if((i-this.currentDate) / 86400000 > right) classn = "z_d";
				if(Math.abs(this.chooseDate - i) < 100000)  { classn = "z_c";  }
				buffer += "<td class="+classn+" i="+l+">" + i.getDate() + "</td>";
				this.myNumber[l] = eval(uneval(i));	
				i.setDate(i.getDate() + 1);
				if(i.getDay() == 1) buffer += "</tr><tr>";
				l++;
			}
			buffer += "</tr></table>";
			this.container.innerHTML =buffer;	
		}
		this.HandleClick = function(e){
			var h = e.target;
			var nameClass = h.className;
			if(nameClass == "z_t" && h.innerHTML != "&nbsp;") {
				this.chooseDate = this.myNumber[e.target.getAttribute('i')];
				this.Generate();
			} else if(nameClass == "z_l_c" || nameClass == "z_r_c") { 
				this.showDate.setDate(nameClass == "z_l_c" ? -1 : 32);
				this.showDate.setDate(1);
				this.Generate();
			}
		}
		document.body.appendChild(this.container);
		this.Generate();
		this.container.addEventListener("click", this.HandleClick.bind(this), false);
}