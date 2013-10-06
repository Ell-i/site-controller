#!/usr/bin/perl -w
use strict;
use CGI;

my $query = CGI->new;

my $red     = 0;
my $green   = 0;
my $blue    = 0;
my $valobg  = "";
my $bodybg  = "#ffffff";

##
#
# Tänne jotain komentorivikalaa queryämään valaisimen statusta CoAP:lla
# populoidaan vaikka $red $green ja $blue niillä
#
# Toki myös samat kalat heittää formilta saadut arvot valaisimelle...
#
# Huonoa: status hyödynnetään vain jos formi ladataan neitseellisesti,
#         muutoin formin olevat arvot jyrää


##
#
# Jos formin arvoissa vahingossa onkin red green ja blue, otetaan ne käyttöön
# nyt vielä ilman sen suurempia tarkistuksia oliko sittenkään kyseessä lukuarvo
#
if (defined($query->param('red'))) {
    $red   = $query->param('red');
}
if (defined($query->param('green'))) {
    $green = $query->param('green');
}
if (defined($query->param('blue'))) {
    $blue  = $query->param('blue');
}

$valobg = sprintf '#%02x%02x%02x', $red, $green, $blue;

print $query->header();

print <<EOF;
<!DOCTYPE html>
<html>
<head>
<style>
    #valaisinkuva { background-color: $valobg; }
    body          { background-color: $bodybg; }
    .koko         { width: 100%; }
</style>
<script type='text/javascript'>
    function submittaa() {
        document.valaisin1form.submit();
    }
</script>
</head>

<body>

<div>
    <img src='valo1.png'
        alt='hiano valaisimen kuva'
        id='valaisinkuva'
        class='koko'>

    <form action='http://192.168.43.99/~teemu/valaisin1.cgi' id='valaisin1form'
          name='valaisin1form' method='post'>

        <p class='koko'><input type='range' min='0' max='255'
                  id='red'   name='red' value=\'$red\'
                  onmouseup='submittaa();'>
        </p>

        <p class='koko'><input type='range' min='0' max='255'
                  id='green' name='green' value=\'$green\'
                  onmouseup='submittaa();'>
        </p>

        <p class='koko'><input type='range' min='0' max='255'
                  id='blue'  name='blue' value=\'$blue\'
                  onmouseup='submittaa();'>
        </p>
    </form>
</div>
</body>
</html>
EOF
