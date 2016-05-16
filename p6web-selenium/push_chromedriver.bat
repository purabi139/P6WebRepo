set url="http://maven.us.oracle.com:8080/archiva/repository/snapshots"
set repo="snapshots"
set group="com.google.chromium.chromedriver"
set version="2.x"

call mvn -B deploy:deploy-file -Durl=%url% -DrepositoryId=%repo% -Dfile=chromedriver_win32_2.3.zip -DgroupId=%group% -DartifactId=chromedriver-win  -Dversion=%version% -Dpackaging=zip -DuniqueVersion=false 
call mvn -B deploy:deploy-file -Durl=%url% -DrepositoryId=%repo% -Dfile=chromedriver_linux32_2.3.zip -DgroupId=%group% -DartifactId=chromedriver-linux32  -Dversion=%version% -Dpackaging=zip -DuniqueVersion=false
call mvn -B deploy:deploy-file -Durl=%url% -DrepositoryId=%repo% -Dfile=chromedriver_linux64_2.3.zip -DgroupId=%group% -DartifactId=chromedriver-linux64  -Dversion=%version% -Dpackaging=zip -DuniqueVersion=false
call mvn -B deploy:deploy-file -Durl=%url% -DrepositoryId=%repo% -Dfile=chromedriver_mac32_2.3.zip -DgroupId=%group% -DartifactId=chromedriver-mac  -Dversion=%version% -Dpackaging=zip -DuniqueVersion=false



