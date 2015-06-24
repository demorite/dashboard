// Welcome to the RazorFlow Dashbord Quickstart. Simply copy this "dashboard_quickstart"
// to somewhere in your computer/web-server to have a dashboard ready to use.
// This is a great way to get started with RazorFlow with minimal time in setup.
// However, once you're ready to go into deployment consult our documentation on tips for how to
// maintain the most stable and secure



StandaloneDashboard(function(db){
	// YOU CAN DELETE THE ENTIRE CONTENTS OF THIS FUNCTION AND CUSTOMIZE
	// AS PER YOUR REQUIREMENT.
	// These components are simply here to give you a quick introduction of how RazorFlow Works

	function getAllDataFrom(url, page, methodFunction, previousData, jaifini) {
		methodFunction(url + '?page=' + page, function(data){
			if(data.length == 0){
				jaifini(previousData);
			} else {
				newData = previousData.concat(data);
				if (data.length<30) {
					jaifini(newData);
				} else {
					getAllDataFrom(url, page + 1, methodFunction, newData, jaifini);
				}
			}
		})
	}




	db.setDashboardTitle ("My Dashboard");

	var nbReferences = new KPIComponent ();
	nbReferences.setDimensions (3, 2);
	nbReferences.lock();
	db.addComponent (nbReferences);
	var refValue = 0;
	var refLock = 0;
	nbReferencesUpdate(refValue);

	function nbReferencesUpdate(refValue)
	{
		$.get("http://localhost:8888/Projet/indicateurs/1", function (data) {
			nbReferences.setCaption (data.name);
			if (refValue != data.value)
			{
				nbReferences.setValue(data.value);
			}
			refValue = data.value;
			if (refLock == 0)
			{
				nbReferences.unlock();
				refLock = 1;
			}
			setTimeout(function()
			{

				nbReferencesUpdate(refValue);
			}, 2000000000);
		});
	}

	var effectif = new KPIComponent ();
	effectif.setDimensions (2, 2);
	effectif.lock();
	db.addComponent (effectif);
	var effectifValue = 0;
	var effectifLock = 0;
	effectifUpdate(effectifValue);

	function effectifUpdate(effectifValue)
	{
		$.get("http://localhost:8888/Projet/indicateurs/2", function (data) {
			effectif.setCaption (data.name);
			if (effectifValue != data.value)
			{
				effectif.setValue(data.value);
			}
			effectifValue = data.value;
			if (effectifLock == 0)
			{
				effectif.unlock();
				effectifLock = 1;
			}
			setTimeout(function()
			{
				effectifUpdate(effectifValue);
			}, 2000000000);
		});
	}

	var ChiffreAffaire = new KPIComponent ();
	ChiffreAffaire.setDimensions (3, 2);
	ChiffreAffaire.lock();
	db.addComponent (ChiffreAffaire);
	var ChiffreAffaireValue = 0;
	var ChiffreAffaireLock = 0;
	ChiffreAffaireUpdate(ChiffreAffaireValue);

	function ChiffreAffaireUpdate(ChiffreAffaireValue)
	{
		$.get("http://localhost:8888/Projet/indicateurs/3", function (data) {
			ChiffreAffaire.setCaption (data.name);
			if (ChiffreAffaireValue != data.value)
			{
				ChiffreAffaire.setValue(data.value,{
					numberHumanize:true
				});
			}
			ChiffreAffaireValue = data.value;
			if (ChiffreAffaireLock == 0)
			{
				ChiffreAffaire.unlock();
				ChiffreAffaireLock = 1;
			}
			setTimeout(function()
			{
				ChiffreAffaireUpdate(ChiffreAffaireValue);
			}, 2000000000);
		});
	}


	var nbMembresGitHub = new KPIComponent ();
	nbMembresGitHub.setDimensions (4, 2);
	nbMembresGitHub.lock();
	db.addComponent (nbMembresGitHub);
	var nbMembresGitHubValue = 0;
	var nbMembresGitHubLock = 0;
	nbMembresGitHubUpdate(nbMembresGitHubValue);
	nbMembresGitHub.setCaption ('Nombre de membres sur le GitHub de Clever-age');

	function nbMembresGitHubUpdate(nbMembresGitHubValue)
	{

		getAllDataFrom("https://api.github.com/orgs/cleverage/members", 1, $.get, [], function (data) {
			if (nbMembresGitHubValue != data.length)
			{
				nbMembresGitHub.setValue(data.length);
			}
			nbMembresGitHubValue = data.length;
			if (nbMembresGitHubLock == 0)
			{
				nbMembresGitHub.unlock();
				nbMembresGitHubLock = 1;
			}
			setTimeout(function()
			{
				nbMembresGitHubUpdate(nbMembresGitHubValue);
			}, 86400000);
		}
		);
	}

	var lastProjectCommit = new TableComponent ();
	lastProjectCommit.setDimensions (12, 5);
	lastProjectCommit.setCaption ("Dernier commit de chaques projets");
	// lastProjectCommit.addColumn ("id", "number");
	lastProjectCommit.addColumn ("name", "Project_Name");
	lastProjectCommit.addColumn ("nbcommit", "Nombre total de commits");
	lastProjectCommit.addColumn ("commit", "Commit");
	lastProjectCommit.addColumn ("date", "Date");
	db.addComponent(lastProjectCommit);

	$.get("https://api.github.com/orgs/cleverage/repos", function (data){
		//	console.log(data);
		data.forEach(function(element, key){

			getAllDataFrom(data[key].commits_url.replace('{/sha}',"" ), 1, $.get, [],function (commit){
					//console.log(data[key].commits_url.replace('{/sha}',"" ));
					// console.log(data[key]);
					// console.log(commit[0]);
					// var cle = parseInt(key)+1;
					date = new Date(commit[0].commit.committer.date);

					lastProjectCommit.addRow ({
						// "id": cle,
						"name": data[key].name,
						"nbcommit": Object.keys(commit).length,
						"commit": commit[0].commit.message,
						"date": date.toString().substr(0,24)
					});
				});

		});
	});


/*
	var NomProjetsEnCours = new KPIComponent ();
	NomProjetsEnCours.setDimensions (2, 2);
	NomProjetsEnCours.lock();
	db.addComponent (NomProjetsEnCours);
	var NomProjetsEnCoursValue = 0;
	var NomProjetsEnCoursLock = 0;
	NomProjetsEnCoursUpdate(NomProjetsEnCoursValue);
	
	function NomProjetsEnCoursUpdate(NomProjetsEnCoursValue)
	{
		$.get("http://localhost:8888/Projet/indicateurs/2", function (data) {
			NomProjetsEnCours.setCaption (data.name); 
			if (NomProjetsEnCoursValue != data.value) 
			{
				NomProjetsEnCours.setValue(data.value);
			}
			NomProjetsEnCoursValue = data.value;
			if (NomProjetsEnCoursLock == 0) 
			{
				NomProjetsEnCours.unlock();
				NomProjetsEnCoursLock = 1;
			}
			setTimeout(function()
			{
				NomProjetsEnCoursUpdate(NomProjetsEnCoursValue);
			}, 2000000000);
		});
	}


	var NbBugsProjetsEnCours = new KPIComponent ();
	NbBugsProjetsEnCours.setDimensions (2, 2);
	NbBugsProjetsEnCours.lock();
	db.addComponent (NbBugsProjetsEnCours);
	var NbBugsProjetsEnCoursValue = 0;
	var NbBugsProjetsEnCoursLock = 0;
	NbBugsProjetsEnCoursUpdate(NbBugsProjetsEnCoursValue);
	
	function NbBugsProjetsEnCoursUpdate(NbBugsProjetsEnCoursValue)
	{
		$.get("http://localhost:8888/Projet/indicateurs/2", function (data) {
			NbBugsProjetsEnCours.setCaption (data.name); 
			if (NbBugsProjetsEnCoursValue != data.value) 
			{
				NbBugsProjetsEnCours.setValue(data.value);
			}
			NbBugsProjetsEnCoursValue = data.value;
			if (NbBugsProjetsEnCoursLock == 0) 
			{
				NbBugsProjetsEnCours.unlock();
				NbBugsProjetsEnCoursLock = 1;
			}
			setTimeout(function()
			{
				NbBugsProjetsEnCoursUpdate(NbBugsProjetsEnCoursValue);
			}, 2000000000);
		});
	}


	var PourcentageDesProjets = new KPIComponent ();
	PourcentageDesProjets.setDimensions (2, 2);
	PourcentageDesProjets.lock();
	db.addComponent (PourcentageDesProjets);
	var PourcentageDesProjetsValue = 0;
	var PourcentageDesProjetsLock = 0;
	PourcentageDesProjetsUpdate(PourcentageDesProjetsValue);
	
	function PourcentageDesProjetsUpdate(PourcentageDesProjetsValue)
	{
		$.get("http://localhost:8888/Projet/indicateurs/2", function (data) {
			PourcentageDesProjets.setCaption (data.name); 
			if (PourcentageDesProjetsValue != data.value) 
			{
				PourcentageDesProjets.setValue(data.value);
			}
			PourcentageDesProjetsValue = data.value;
			if (PourcentageDesProjetsLock == 0) 
			{
				PourcentageDesProjets.unlock();
				PourcentageDesProjetsLock = 1;
			}
			setTimeout(function()
			{
				PourcentageDesProjetsUpdate(PourcentageDesProjetsValue);
			}, 2000000000);
		});
	}


	var NbArticles = new KPIComponent ();
	NbArticles.setDimensions (2, 2);
	NbArticles.lock();
	db.addComponent (NbArticles);
	var NbArticlesValue = 0;
	var NbArticlesLock = 0;
	NbArticlesUpdate(NbArticlesValue);
	
	function NbArticlesUpdate(NbArticlesValue)
	{
		$.get("http://localhost:8888/Projet/indicateurs/2", function (data) {
			NbArticles.setCaption (data.name); 
			if (NbArticlesValue != data.value) 
			{
				NbArticles.setValue(data.value);
			}
			NbArticlesValue = data.value;
			if (NbArticlesLock == 0) 
			{
				NbArticles.unlock();
				NbArticlesLock = 1;
			}
			setTimeout(function()
			{
				NbArticlesUpdate(NbArticlesValue);
			}, 2000000000);
		});
	}


	var NbCleverMarks = new KPIComponent ();
	NbCleverMarks.setDimensions (2, 2);
	NbCleverMarks.lock();
	db.addComponent (NbCleverMarks);
	var NbCleverMarksValue = 0;
	var NbCleverMarksLock = 0;
	NbCleverMarksUpdate(NbCleverMarksValue);
	
	function NbCleverMarksUpdate(NbCleverMarksValue)
	{
		$.get("http://localhost:8888/Projet/indicateurs/2", function (data) {
			NbCleverMarks.setCaption (data.name); 
			if (NbCleverMarksValue != data.value) 
			{
				NbCleverMarks.setValue(data.value);
			}
			NbCleverMarksValue = data.value;
			if (NbCleverMarksLock == 0) 
			{
				NbCleverMarks.unlock();
				NbCleverMarksLock = 1;
			}
			setTimeout(function()
			{
				NbCleverMarksUpdate(NbCleverMarksValue);
			}, 2000000000);
		});
	}


	var NbAbonnesTweeter = new KPIComponent ();
	NbAbonnesTweeter.setDimensions (2, 2);
	NbAbonnesTweeter.lock();
	db.addComponent (NbAbonnesTweeter);
	var NbAbonnesTweeterValue = 0;
	var NbAbonnesTweeterLock = 0;
	NbAbonnesTweeterUpdate(NbAbonnesTweeterValue);
	
	function NbAbonnesTweeterUpdate(NbAbonnesTweeterValue)
	{
		$.get("http://localhost:8888/Projet/indicateurs/2", function (data) {
			NbAbonnesTweeter.setCaption (data.name); 
			if (NbAbonnesTweeterValue != data.value) 
			{
				NbAbonnesTweeter.setValue(data.value);
			}
			NbAbonnesTweeterValue = data.value;
			if (NbAbonnesTweeterLock == 0) 
			{
				NbAbonnesTweeter.unlock();
				NbAbonnesTweeterLock = 1;
			}
			setTimeout(function()
			{
				NbAbonnesTweeterUpdate(NbAbonnesTweeterValue);
			}, 2000000000);
		});
	}


	var DernierArticle = new KPIComponent ();
	DernierArticle.setDimensions (2, 2);
	DernierArticle.lock();
	db.addComponent (DernierArticle);
	var DernierArticleValue = 0;
	var DernierArticleLock = 0;
	DernierArticleUpdate(DernierArticleValue);
	
	function DernierArticleUpdate(DernierArticleValue)
	{
		$.get("http://localhost:8888/Projet/indicateurs/2", function (data) {
			DernierArticle.setCaption (data.name); 
			if (DernierArticleValue != data.value) 
			{
				DernierArticle.setValue(data.value);
			}
			DernierArticleValue = data.value;
			if (DernierArticleLock == 0) 
			{
				DernierArticle.unlock();
				DernierArticleLock = 1;
			}
			setTimeout(function()
			{
				DernierArticleUpdate(DernierArticleValue);
			}, 2000000000);
		});
	}


	var NbBlessesMT = new KPIComponent ();
	NbBlessesMT.setDimensions (2, 2);
	NbBlessesMT.lock();
	db.addComponent (NbBlessesMT);
	var NbBlessesMTValue = 0;
	var NbBlessesMTLock = 0;
	NbBlessesMTUpdate(NbBlessesMTValue);
	
	function NbBlessesMTUpdate(NbBlessesMTValue)
	{
		$.get("http://localhost:8888/Projet/indicateurs/2", function (data) {
			NbBlessesMT.setCaption (data.name); 
			if (NbBlessesMTValue != data.value) 
			{
				NbBlessesMT.setValue(data.value);
			}
			NbBlessesMTValue = data.value;
			if (NbBlessesMTLock == 0) 
			{
				NbBlessesMT.unlock();
				NbBlessesMTLock = 1;
			}
			setTimeout(function()
			{
				NbBlessesMTUpdate(NbBlessesMTValue);
			}, 2000000000);
		});
	}


	var NbTweets = new KPIComponent ();
	NbTweets.setDimensions (2, 2);
	NbTweets.lock();
	db.addComponent (NbTweets);
	var NbTweetsValue = 0;
	var NbTweetsLock = 0;
	NbTweetsUpdate(NbTweetsValue);
	
	function NbTweetsUpdate(NbTweetsValue)
	{
		$.get("http://localhost:8888/Projet/indicateurs/2", function (data) {
			NbTweets.setCaption (data.name); 
			if (NbTweetsValue != data.value) 
			{
				NbTweets.setValue(data.value);
			}
			NbTweetsValue = data.value;
			if (NbTweetsLock == 0) 
			{
				NbTweets.unlock();
				NbTweetsLock = 1;
			}
			setTimeout(function()
			{
				NbTweetsUpdate(NbTweetsValue);
			}, 2000000000);
		});
	}


	var NbCafesConsommes = new KPIComponent ();
	NbCafesConsommes.setDimensions (2, 2);
	NbCafesConsommes.lock();
	db.addComponent (NbCafesConsommes);
	var NbCafesConsommesValue = 0;
	var NbCafesConsommesLock = 0;
	NbCafesConsommesUpdate(NbCafesConsommesValue);
	
	function NbCafesConsommesUpdate(NbCafesConsommesValue)
	{
		$.get("http://localhost:8888/Projet/indicateurs/2", function (data) {
			NbCafesConsommes.setCaption (data.name); 
			if (NbCafesConsommesValue != data.value) 
			{
				NbCafesConsommes.setValue(data.value);
			}
			NbCafesConsommesValue = data.value;
			if (NbCafesConsommesLock == 0) 
			{
				NbCafesConsommes.unlock();
				NbCafesConsommesLock = 1;
			}
			setTimeout(function()
			{
				NbCafesConsommesUpdate(NbCafesConsommesValue);
			}, 2000000000);
		});
	}
	*/
});

