Emeraude
========

Emeraude Ajax is a javascript/jquery micro library who tend to extend Html to use ajax without writing on line of js.

To be HTML5 compliant all html attribute start with data-.

##Activate ajax to a link or a form

### Link 
	<a data-em-ajax='true' href="/link">Link</a>
	
Congratulation ! Your link now trigger an ajax request. 
### Form
	<form data-em-ajax='true' action="/form" method="POST">...</form>

Congratulation ! Your form submission now trigger an ajax request. 

## Link features

### Link request return html
If you want to write the html returner by your link somewhere. You could just use :

	<a data-em-return-destination='#jqueryselector' ...
	
When you have a return destination you could add a loading class to diplay some effect when loading.

	<a data-em-ajax-loading-class='main-loading' data-em-return-destination='#jqueryselector' ...

### Link switch action

#### Switch class, href and text
The switch action allow you to switch text, href, class after the ajax submission. In the folowing exemple we want a like that allow you to bookmark or unbookmark something. We want to modify the style by changing the class.
 
	<a href="/linkTrue" class="bookmark"
		data-em-ajax='true'
		data-em-ajax-switch-class='unbookmark'
		data-em-ajax-switch-href='/linkFalse'
		data-em-ajax-switch-text="UnBookmark"
	>
		Bookmark
	</a>

#### Switch once
If you want to disabled the link effect after switching the class for exemple you could use :

	data-em-ajax-switch-once='true'
	
#### Active class
If you want to add a selected class to the link :

	data-em-ajax-active-class='active'
	
#### Remove the link after click

	data-em-ajax-remove='true'

## Form features

### Form request return html
If you want to write the html returner by your link somewhere. You could just use :

	<from data-em-return-destination='#jqueryselector' ...
	
## TODO:
* Merge link and form  code
* Suppress jQuery dependancy
	
	


