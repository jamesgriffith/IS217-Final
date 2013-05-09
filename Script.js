/* final javscript project

   ----- Credit -----
   JQuery
   BackBone.js
   UnderScore.js
   -------------------
   Project By:
   Jennifer Soh
   James Griffith
   
   Description:  This project demonstrates several different javascript libraries
                 BackBone.js:  This library is used to make overwhelming applications simpler uses the MVC Framework
				 JQuery:  can be used for animations
				 
				 The main goal here was to make an image slideshow implementing an API
				 
				 --- Flickr API (http://www.flickr.com/services/feeds/docs/photos_public/) ---
				 This is the API used for this project
				 It works by a tagging system. 
				 The tag is hard-coded into the application's JS file.
				 The Tag is: Jamesandjen217
				 Tagmode: All.  this is default for the tagging system
				 Format: JSON  you can choose from JSON or XML but XML is a pain in the ...
				 
				 --- Background ---
				 Jennifer is a Graduate of Montclair
				 James is an undergrad of NJIT
				 Both of them are novice with JavaScript


*/
				 

(function ($){	//init the jQuery function!!! YAHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHH

	/*
	
	---- Breakdown of this horrible BackBone system ----
	
	Model -> Function
	
	Collection -> Function
	
	View -> Function
	
	FlickrPhotoModel
	
		- Defining the whole thing
		
		FlickrPhotoCollection
		
			- Collecting all of the photos in the payload and holding them
			
			FlickrPhotoView
			
				-Load all those photos into the webpage and show them to the user
			
	This is the model portion of the code,
	----------- Model -----------
	View
	Collection
	*/
	var FlickrPhoto = Backbone.Model.extend ({ //declaring the Backbone model  THE WHOLE DEAL  M.V.C.
		

		PhotoModel: function(){
			// This is the FlickrPhoto model,  this is where the FlickrPhotos will be "made"
			console.log('after the model loads');
		}
	});
		/*
	This is the collection portion of the code,
	Model
	View
	---------- Collection ---------
	*/
	var FlickrPhotos = Backbone.Collection.extend({ //declaring the backbone collection
		model: FlickrPhoto, // from what the professor said, the model is what it is.  so if it is a donut, the model: donut

		FlickrPhotoCollection: function(){ 
			console.log('after the collection loads');
		}
	});
	
	/*
	This is the view portion of the code,
	Model
	---------- View --------------
	Collection
	*/
	var FlickrPhotoView = Backbone.View.extend ({
		// init view
		GrabPhoto: function(){
			console.log('GrabPhoto Is Sucessful');
		},

		 LoadImages: function(){
			
			var ShowImg = document.getElementById("ImageCarousel");

				for (var i = 1; i <= 5; i++){
				var Img = document.createElement("img");
				Img.setAttribute("id");
				Img.setAttribute("style");
				var ImgStored = new FlickrPhoto({id: i});
				var Piks = new FlickrPhotos([ImgStored]);
				console.log('Added '+ImgStored);
				console.log(Piks);
				ShowImg.appendChild(Img);
			} 
			console.log('Finished Loading Images');
		}, 

		LoadApiImg: function(){
			var ApiPics = new Array();
			//var TagSearch = "jamesandjen217";
			$.getJSON ("http://api.flickr.com/services/feeds/photos_public.gne?&tags=jamesandjen217&lang=en-us&format=json&jsoncallback=?")
			.done(function (data){
				console.log('Success Connection');
				$.each ( data.items, function (i, item) {
 					
						$("#title").html(item.title); //displays title of the photo
							
							$("#description").html(item.tags); //displays tags of the photo.  in this case the tags will all be the same because its only looking for jamesandjen217
   							
							$("<img>").attr( { id: 'Api'+i, src: item.media.m } ).appendTo("#FlickrPhotoRotator");
					if (i === 10) {   //this will only display as many as you tell it to.  the magic number in this case is 10
					return false; //keep loading til 10
	  		};
						
	});
				// next we will load the title of the images and their respective descriptions.  Professor Keith Williams has told us to do so so we will do it.
			//	$("#title").html (data.title);
			//	$("#description").html ();
					//	Console.log('Loading descriptions and title');
			});
			


		},


		FlickrAnimation: function(){
			console.log('init animation');
										var MaxImages = 10; // this is the same as above but you need to make sure it is either equal or greater
										var MinImages = 0; // start at zero annd work its way up to 10
			
			//Sets of the sliding images after image 1
			setInterval(function (){ $("#Api"+MinImages).hide("fade", {}), 1000;
				
			 	
			 	//Creates the Loop
			 	if (MinImages == MaxImages){
			 			MinImages = 0; // Should match the begining funciton
			 		}
			 		else{
			 			MinImages = MinImages + 1;
			 		}
			 }, 10000);// <-- This is the total of all the time units in the function above.
		},

	});


	ImageRotator = new FlickrPhotoView; // the rotator shows the photos in rotation
	Pic = new FlickrPhoto;
	Pics = new FlickrPhotos;

	ImageRotator.GrabPhoto();
	Pic.PhotoModel();
	Pics.FlickrPhotoCollection();

	ImageRotator.LoadImages();
	ImageRotator.LoadApiImg();
	ImageRotator.FlickrAnimation();
})(jQuery);

/* , {
					//tags: ApiSearchTag,  // this will ensure only the photos tagged under Jamesandjen217 will be shown
					//tagmode: "any",  // assume you had James_and_jane_217 instead,  it will search for james, and, jen, 217 instead of jamesandjen217
					//format: "json", //this is the ofrmat of infomration pulled from flickr
					//lang: "en-us"   //it will only pull fron the language inwhich you specify
				} */