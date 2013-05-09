(function ($){
		   

	var FlickrPhoto = Backbone.Model.extend ({
			PhotoModel: function(){
		    console.log('after the model loads');
		}
	});
	var FlickrPhotos = Backbone.Collection.extend({
		model: FlickrPhoto,
		FlickrPhotoCollection: function(){ 
			console.log('after the collection loads');
		}
	});
	var FlickrPhotoView = Backbone.View.extend ({
		// init view
		GrabPhoto: function(){
			console.log('GrabPhoto');
		},
        LoadImages: function(){
	var ShowImg = document.getElementById("ImageCarousel");

				for (var i = 1; i <= 5; i++){ var Img = document.createElement("img");
				Img.setAttribute("id");
				Img.setAttribute("style");
				var Storage = new FlickrPhoto({id: i});
				var PictureFrame = new FlickrPhotos([Storage]);
				ShowImg.appendChild(Img);
			} 
			console.log('the flickr has finished the iimg');
		}, 

		LoadApiImg: function(){
			var ApiPics = new Array();
			$.getJSON ("http://api.flickr.com/services/feeds/photos_public.gne?&tags=jamesandjen217&lang=en-us&format=json&jsoncallback=?")
			.done(function (data){
			
				$.each ( data.items, function (i, item) { $("#title").html(item.title);
							$("#description").html(item.tags);
							$("<img>").attr( { id: 'Api'+i, src: item.media.m } ).appendTo("#FlickrPhotoRotator");
					if (i === 10) { 
					return false; 
	  		};
	});
});
			},
			FlickrAnimation: function(){ var MaxImages = 10; 
			                             var MinImages = 0;

			setInterval(function (){ $("#Api"+MinImages).hide("fade", {}), 1000;

			 	if (MinImages == MaxImages){
			 			MinImages = 0;
			 		}else{
					MinImages = MinImages + 1;
			 		}
			 }, 2000);
		},

	});
	ImageRotator = new FlickrPhotoView;
			 Pic = new FlickrPhoto;
		    Pics = new FlickrPhotos;

					   ImageRotator.GrabPhoto();
					   Pic.PhotoModel();
   				   	   Pics.FlickrPhotoCollection();
					   ImageRotator.LoadImages();
	                   ImageRotator.LoadApiImg();
	                   ImageRotator.FlickrAnimation();
})(jQuery);
