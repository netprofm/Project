# Design Document

INTERFACE
---------
In de interface van de visualisatie komt een kaart van Nederland en alle spoorwegen centraal te staan, met daarnaast een informatie-/bedieningsmodule. Op deze kaart zullen verschillende dingen te zien zijn: Alle spoorlijnen van Nederland in gebruik voor personenvervoer zullen globaal zichtbaar zijn, net als alle grote stations (dat is: alle begin- en eindpunten van de treindiensten in Nederland en alle stations waar het spoor splitst). De "probleemtrajecten" zullen gehighlight worden afhankelijk van een ingestelde datum. Op de kaart kan ook worden weergegeven hoeveel treinen er per traject per uur rijden: immers, een verstoring op een drukker traject zal waarschijnlijk tot meer vertragingen leiden. Wellicht kan de dikte van de lijn worden aangepast. 

In de informatie-/bedieningsmodule komen verschillende dingen te staan. Qua bediening het volgende: Datumselector, verschillende toggles om dingen op de kaart wel of niet weer te geven (denk aan weersomstandigheden aan of uit, bepaalde getallen over punctualiteit en aantal treinen per dag op de kaart) om zodoende bepaalde dingen op de kaart weer te geven naargelang de gebruiker's wensen. 
Informatie komt uit enkele grafieken/figuren aanwezig in de informatiemodule. Zo komt er een getal te staan met de punctualiteit van die dag (in procenten). Ook twee grafieken: Eentje over het aantal storingen verdeeld over de types storingen (aantal wisselstoringen, aantal defecte treinen, enz.), en eentje over de punctualiteit afhankelijk van de weersomstandigheden (deze kan misschien alleen aan als de weersomstandigheden aangetoggled staan in het controlepaneel). 

Het lijkt me ook erg mooi om op de kaart niet enkel de storingen van die dag weer te kunnen geven. Hopelijk is het ook haalbaar om een kaart te maken van welke lijnen het meest verstoord worden (en dus waarschijnlijk het meest vertraagd zijn), en welke grote stations daarbij horen. Ook zou het mooi zijn om te kunnen sorteren op wat voor storingen het zijn: Zo kan je op de kaart zien waar de meeste wisselstoringen zijn of waar de meeste aanrijdingen met personen zijn. 

CODE
----
Het project gaat uiteraard met Javascript en D3 gemaakt worden. Wellicht dus MySQL als database. Het kan zijn dat php nuttig is om meerdere HTML pagina's aan elkaar te lussen mocht dat nog nodig worden, maar het is de bedoeling om 1 pagina te maken.

DATA
----
De data van dit project is opgedeeld in drie delen: Een deel storingsdata, een deel punctualiteitsdata en een deel weerdata. De weergave gebeurt op een spoorkaart-SVG.

Storingsdata: 
Dit is een enorme excel tabel waarin elke storing op het personenvervoer-railnetwerk staat. Daarbij is de datum, voorspelde duur, werkelijke duur, traject en beinvloedde stations te zien. Deze data kan wellicht in een MySQL database worden geplaatst. Het is hierdoor gemakkelijk en snel te benaderen, en behoeft weinig verandering. Een verandering die nog wel essentieel is, is om te zorgen dat alle ritten/trajecten een vast format hebben zodat ze correct ingekleurd kunnen worden op de kaart. Dat betekent: Er moet uit een format van bijvoorbeeld "Hilversum - Amsterdam C/Schiphol" het volgende worden gehaald: Het traject Hilversum - Amsterdam Centraal en het traject Hilversum - Schiphol. Daarbij moet er ook bekend zijn langs welke sporen dit traject loopt. De enige manier om dit te overkomen is mijns inziens om uit de excel file (of de MySQL database) alle verschillende trajecten te halen en te zorgen dat elk traject met bepaalde lijnen in de SVG wordt gekoppeld. 

De SVG van de spoorkaart:
Er is een SVG van een spoorkaart van Nederland uit 2013 gevonden. Helaas is er een klein probleem. De lijnen op de SVG zijn totaal ongeorganiseerd. Het plan is om de SVG te nemen van de kaart van Nederland en daar zelf met een SVG editor op geordende wijze alle steden en de spoorlijnen ertussen te tekenen. Hierdoor onstaat er in een keer een overzichtelijk geheel waarin bekend is welke id welk spoor heeft. Als alle sporen bekend zijn is het zeer eenvoudig om een database aan te leggen waarin de sporen gekoppeld zijn aan de id's van de paths. Als alle steden los zijn getekend kunnen deze ook los aangegeven worden: er is soms niet een storing op een traject, maar alleen in op 1 station. 

Punctualiteitsdata:
De structuur van deze data is nog niet bekend. De website vertraa.gd heeft alle data. Er is al contact gelegd maar nog geen antwoord gekomen. De mogelijkheid om de data te parsen bestaat en is zeer eenvoudig. Echter gaan ze dan, gezien alles op een aparte pagina staat, wel heel veel http-requestjes krijgen dus ik hoop dat dat goed gaat.

Weerdata:
De weerdata is de KNMI-data zoals al eerder gebruikt. Deze kan per stad/regio per jaar worden gedownload als CSV bestand. Om mooi of slecht weer te bepalen is het nodig een combinatie te maken van de weerdata: Zonneschijn, temperatuur, neerslag, sneeuw, etc. Misschien is het echter wel handiger om alleen naar slechte weersomstandigheden te kijken: Regen, wind en sneeuw. Hoe meer regen, wind of sneeuw, hoe slechter het weer.




