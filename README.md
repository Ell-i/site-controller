Demo
====

Demonstration kit

webux/valaisin1.cgi
===================

This is a simple cgi script that presents a web user with some sliders in a form.
Sliders trigger form POST submit on an onmouseup event and the whole page is reloaded.

On the server side, command line glue for CoAP needs to be added.

The image is a png with transparency so that its background colour changes with the sliders.

The script has hard coded url addresses.

Requires a web server that allows ExecCGI for the directory.

% cat /etc/apache2/users/teemu.conf 
<Directory "/Users/teemu/Sites/">
Options ExecCGI Indexes Multiviews FollowSymLinks
AddHandler cgi-script .cgi
AllowOverride AuthConfig Limit
Order allow,deny
Allow from all
</Directory>

http://reviews.cnet.com/8301-13727_7-57481978-263/how-to-enable-web-sharing-in-os-x-mountain-lion/

