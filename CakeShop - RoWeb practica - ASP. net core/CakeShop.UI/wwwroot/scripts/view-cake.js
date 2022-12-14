const cakeControllerUri = "https://localhost:44323/api/cake/";
const reviewControllerUri = "https://localhost:44323/api/review/";
const transactionControllerUri = "https://localhost:44323/api/transaction/";


$(document).ready(function () {
    var cakeId = getUrlVars()["cakeid"];
	getCake(cakeId);

	getReviews(cakeId);

	// review functionality
	var reviewBox = $('#post-review-box');
	var newReview = $('#new-review');
	var openReviewBtn = $('#open-review-box');
	var closeReviewBtn = $('#close-review-box');
	var ratingsField = $('#ratings-hidden');

	openReviewBtn.click(function (e) {
		reviewBox.slideDown(400, function () {
			$('#new-review').trigger('autosize.resize');
			newReview.focus();
		});
		openReviewBtn.fadeOut(100);
		closeReviewBtn.show();
	});

	closeReviewBtn.click(function (e) {
		e.preventDefault();
		reviewBox.slideUp(300, function () {
			newReview.focus();
			openReviewBtn.fadeIn(200);
		});
		closeReviewBtn.hide();

	});
	
	// bind submit review
	bindSubmitReview(cakeId);
});

function bindSubmitReview(cakeId) {
	$("#save-review-btn").on("click", function () {

		const review = {
			cakeId: cakeId,
			comment: $("#new-review").val(),
			email: $("#reviewer-email").val()
		};

		$.ajax({
			type: "POST",
			accepts: "application/json",
			url: reviewControllerUri,
			contentType: "application/json",
			data: JSON.stringify(review),
			error: function (jqXHR, textStatus, errorThrown) {
				alert("Something went wrong!");
			},
			success: function (result) {
				window.location.href = '/item/index.html?cakeid=' + cakeId;
			}
		});

		return false;
	});
}

// Read a page's GET URL variables and return them as an associative array.
function getUrlVars() {
    var vars = [], hash;
    var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
    for (var i = 0; i < hashes.length; i++) {
        hash = hashes[i].split('=');
        vars.push(hash[0]);
        vars[hash[0]] = hash[1];
    }
    return vars;
}

function displayCakeDetails(cake) {
    $('#cake-name').html(cake.name);
    $('#cake-price').html(cake.price + ' lei');
    $('#cake-description').html(cake.description);
    $('#cake-category').html(cake.category);
    $('#cake-image').css('max-height', '400px');
    $('#cake-image').attr("src", cake.base64Image);
}

function getCake(cakeId) {
    $.ajax({
        type: "GET",
        url: cakeControllerUri + cakeId,
        cache: false,
        success: function (data) {
            displayCakeDetails(data);
        },
        error: function (jqXHR, textStatus, errorThrown) {
            alert("Something went wrong!");
        }
    });
}

function getReviews(cakeId) {
	$.ajax({
		type: "GET",
		url: reviewControllerUri + cakeId,
		cache: false,
		success: function (data) {
			displayReviews(data);
		},
		error: function (jqXHR, textStatus, errorThrown) {
			alert("Something went wrong!");
		}
	});

}

function displayReviews(reviews) {
	$("#reviews").empty();
	$.each(reviews, function (key, review) {
		$("#reviews").append('<p>' + review.comment + '</p><small class="text-muted">Posted by ' + review.email + ' on ' + review.date + ' </small><hr>');
	});
}

function SubmitTransaction(cakeId) {
    var cakeId = getUrlVars()["cakeid"];
        const transaction = {
            cakeId: cakeId,
            address: $("#Address").val(),
            buyer: $("#name").val(),
            cantitate: $("#cantitate").val()
        };

        $.ajax({
            type: "POST",
            accepts: "application/json",
            url: transactionControllerUri,
            contentType: "application/json",
            data: JSON.stringify(transaction),
            error: function (jqXHR, textStatus, errorThrown) {
                alert("Something went wrong!");
            },
            success: function (result) {
                window.location.href = '/item/index.html?cakeid=' + cakeId;
            }
        });

        return false;
}