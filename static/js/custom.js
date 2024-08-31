    (function() {

        function run() {
            // when the main frame has already been loaded, the check its height
			
			try{
			over = document.getElementById('over'),
			iframe = document.getElementById('sFrame'),
			iframe.height=iframe.contentWindow.document.documentElement.scrollHeight;			
			}catch(e){
				console.log(e); 
				}			
			let x = (screen.width-16) / 806;			
			if (screen.width<822 )
			{	
					
			try{
			let y=iframe.contentWindow.document.documentElement.scrollHeight;
		    iframe.style.transformOrigin='0 0';
			iframe.style.transform = `scale(${x})`;	
			let h = y*x;	
			over.style.height=h +'px';
			
				}catch(e){
				console.log(e); 
				}


			}				
            setTimeout(run, 200);
			
        }
        run();
    })();
