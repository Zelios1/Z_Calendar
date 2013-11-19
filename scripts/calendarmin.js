/*
 * Z_Calendar 0.1
 * (c) 2013 Zusik Ivan
 * MIT license
 */

function Calendar(yourDate, inputElement) {
		this.currentDate = yourDate;
		this.container = document.createElement('div');
		this.container.className = 'hide';
		this.chooseDate = new Date();
		this.inputEl = inputElement;
		this.sw = true;
		this.m = yourDate.getMonth();
		this.y = yourDate.getFullYear();
		this.Generate = function() {
			var firstDay = (new Date(this.y-1900,this.m)).getDay();		
			var countDayOfMonth = (new Date(this.y,this.m+1,0)).getDate();
			var equl = this.m == this.chooseDate.getMonth() && this.y == this.chooseDate.getFullYear();
			var cDate = this.chooseDate.getDate();
			var cDate2 = this.currentDate.getDate();				
			var enable = (new Date(this.y, this.m, 0)) < this.currentDate;
			var buffer = "<table class=z_ch_m><tr><td class=z_l_c>&lsaquo;</td><th>"+(new Date(this.y-1900, this.m)).toString().substring(4,7) + " " +this.y+"</th><td class=z_r_c>&rsaquo;</td></tr></table><table class=zcn>";
			for(var j=0;j<6; j++) {
				buffer += "<tr>";
				var l = (j + 1)* 7- firstDay;
				for(var i=l-7; i<l; i++) {
					buffer += "<td class=";
					if(i> 0 && i <= countDayOfMonth) {							
						if(equl && i == cDate) buffer += "z_c";
						else if(enable && i < cDate2)  buffer += "z_d";
						else buffer += "z_t";
						buffer+=">"+i+"</td>";
					} else {
					buffer += "z_d>&nbsp;</td>";	
					}
				}
				buffer += "</tr>";
			}
			buffer += "</table>";
			this.container.innerHTML =buffer;	
		}
		this.HandleClick = function(e){
			var h = e.target;
			var nameClass = h.className;
			if(nameClass == "z_t" && h.innerHTML != "&nbsp;") {
				this.chooseDate.setDate(h.innerHTML | 0);
				this.chooseDate.setMonth(this.m);
				this.chooseDate.setFullYear(this.y);
				this.Generate();
				this.Switch();
				this.inputEl.value = h.innerHTML+"."+this.m+"."+this.y;
			} else if(nameClass == "z_l_c" || nameClass == "z_r_c") { 
				this.m = nameClass == "z_l_c" ? this.m-1 : this.m+1;
				if(this.m>11) { this.m=0; this.y++; }
				else if(this.m<0) { this.m = 11; this.y--; }
				this.Generate();
			}
		}

		this.Switch = function(e){
			if(this.sw) {
				this.container.className = "show";
				this.container.style.left = (this.inputEl.offsetLeft + 150) + 'px';
				this.container.style.top = (this.inputEl.offsetTop + 40) + 'px';
			} else {
				this.container.className = 'hide';
			}
			this.sw = !this.sw;
		}
		document.body.appendChild(this.container);
		this.inputEl.addEventListener("click", this.Switch.bind(this), false);
		this.Generate();
		this.container.addEventListener("click", this.HandleClick.bind(this), false);
}