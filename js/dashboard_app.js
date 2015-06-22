// Welcome to the RazorFlow Dashbord Quickstart. Simply copy this "dashboard_quickstart"
// to somewhere in your computer/web-server to have a dashboard ready to use.
// This is a great way to get started with RazorFlow with minimal time in setup.
// However, once you're ready to go into deployment consult our documentation on tips for how to 
// maintain the most stable and secure 



StandaloneDashboard(function(db){
	// YOU CAN DELETE THE ENTIRE CONTENTS OF THIS FUNCTION AND CUSTOMIZE
	// AS PER YOUR REQUIREMENT. 
	// These components are simply here to give you a quick introduction of how RazorFlow Works



	db.setDashboardTitle ("My Dashboard");

	

	var numTickets = new KPIComponent ();
	numTickets.setDimensions (3, 3);
	// numTickets.setCaption ("Indicateur");
	// numTickets.setValue (42);
	numTickets.lock();
	db.addComponent (numTickets);

	$.get("http://localhost:8888/Projet/indicateurs/1", function (data) {
		
		// window.alert(5 + 6);
		// This function is executed when the ajax request is successful.
		numTickets.setCaption ('Indicateur nb.'+data.id); // You can also use data.categories
		numTickets.setValue (data.value);

		// Don't forget to call unlock or the data won't be displayed
		numTickets.unlock ();
	});



	var nbindicateurs = new KPIComponent ();
	nbindicateurs.setDimensions (3, 3);
	nbindicateurs.setCaption ('Nombre total d\'indicateurs');
	// nbindicateurs.setCaption ("Indicateur");
	// nbindicateurs.setValue (42);
	//nbindicateurs.lock();
	db.addComponent (nbindicateurs);

	//update();
	setInterval(update, 2000);

	function update(){
		$.get("http://localhost:8888/Projet/indicateurs", function (data) {
			// window.alert(5 + 6);
			// This function is executed when the ajax request is successful.
			 // You can also use data.categories
			
			nbindicateurs.setValue (Object.keys(data).length);

			// Don't forget to call unlock or the data won't be displayed
		  //  nbindicateurs.unlock ();

		});
	}

	



	

});