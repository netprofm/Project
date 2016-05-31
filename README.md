# Project
Chris Olberts

In dit programmeerproject hoop ik een meer diepgaande verklaring te vinden voor vertragingen bij de NS en andere rail-vervoerders door een uiteenzetting te maken van storingen, vertragingen en weersomstandigheden en daar hopelijk al dan niet abberante verbanden/patronen in te kunnen zien.

Door middel van een interactieve spoorkaart met grafieken waarin zaken zoals de stiptheid per dag, stiptheid per weersomstandigheid, storingen per weersomstandigheid en uiteindelijk een grafiek waarin stiptheid per storing tegen een schaal met gunstigheid van de weersomstandigheden weergegeven is weer te geven, hoop ik de gebruiker een mening te kunnen laten vormen over de Nederlandse Spoorwegen. 

Ik gebruik drie datasets: 
1. https://www.rijdendetreinen.nl/
	Deze website geeft informatie over wat voor type storingen er per traject per tijdstip per dag waren voor de laatste vijf jaar.
	Ik ga proberen de data eerst op te vragen door gewoon een mail te sturen, misschien is het in een keer beschikbaar. Anders wordt het lekker parsen wat absoluut geen probleem op zou moeten leveren behalve dat de server ineens een behoorlijk aantal HTTP requests krijgt.

2. https://vertraa.gd/all/daggrafiek/28052014
	vertraa.gd geeft per dag weer hoeveel treinen op elk moment op tijd reden voor de afgelopen vier jaar. Zelfde als met rijdendetreinen.nl
	
3. http://projects.knmi.nl/klimatologie/daggegevens/selectie.cgi
	Op de KNMI website kunnen weersomstandigheden worden gedownload van allerlei soorten in allerlei plaatsen over heel Nederland. De data is eenvoudig als .csv bestand te downloaden.
	
Het wordt waarschijnlijk een kaart waarop de trajecten van de sporen in nederland te zien zijn. Daarboven staat een slider en ernaast zijn twee figuren te zien. Bij een verstoring kleurt een traject rood. Een pop-up vertelt wat voor verstoring er was, en een van de grafieken ernaast is een barchart waarin het aantal verstoringen per type verstoring te zien is. Een provincie of gebied kleurt afhankelijk van de weersomstandigheden donker of licht voor slecht of gunstig weer. De tweede grafiek vertelt de punctualiteit: Sowieso komt het er als percentage naast te staan, maar ook kan er een grafiek komen waarin de algemene weersomstandigheden van nederland (de Bilt o.i.d.) in een scatterplot worden uitgezet tegen de punctualiteit. Hier zal het puntje wat die dag geldt oplichten. 

Er is een aantal haken en ogen dat ik al aan zie komen. Complete chaos in de datasets is natuurlijk funest voor elk project. Dat zal waarschijnlijk wel een grote valkuil zijn hier, gezien ik er drie ga combineren. Wat ook nog kan is dat de assen van de grafieken op een duidelijke manier indelen ook nog best wel lastig kan zijn: Hoe passen weersomstandigheden op een schaalverdeling? Ordinaal? Als een gradient van slecht naar goed? Een duidelijk plan maken zal veel tijd schelen. Ook het zorgen dat sporen uit de dataset correct worden weergegeven op de SVG is waarschijnlijk niet heel gemakkelijk.
