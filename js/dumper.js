(function(){
    "use strict";

    async function getJsonFile() {
        let jsonFetch = await ((await fetch("js/info.json")).text());
        //let jsonText = await jsonFetch.text();
        let jsonResp = JSON.parse(jsonFetch);
        jsonDump(jsonResp);
    }

    getJsonFile();

    const select = (el, all = false) => {
        el = el.trim()
        if (all) {
          return [...document.querySelectorAll(el)]
        } else {
          return document.querySelector(el)
        }
    }

    const aboutDump = (aboutObj)=>{
      let aboutMain = select('#about .container .section-title p');
      aboutMain.innerText = aboutObj.summary;

      let aboutTagline = select('#about .container .row .col-lg-8 h3');
      aboutTagline.innerText = aboutObj.tag;

      let aboutCity = select('#city');
      aboutCity.innerText = aboutObj.city;

      let aboutMail = select('#mail');
      aboutMail.innerText = aboutObj.email;

      let aboutContent = select('#about .container .row .col-lg-8 p');
      aboutContent.innerText = aboutObj.content;
    };

    const skillDump = (skillObj)=>{
      const insertSkill = (skill,parent) => {
        let mainDiv = document.createElement('div');
        mainDiv.setAttribute('class','col-lg-6');
        parent.appendChild(mainDiv);

        let progDiv = document.createElement('div');
        progDiv.setAttribute('class','progress');
        mainDiv.appendChild(progDiv);

        let skillTex = document.createElement('span');
        skillTex.setAttribute('class','skill');
        skillTex.innerText = skill.name;
        progDiv.appendChild(skillTex);

        let skillVal = document.createElement('i');
        skillVal.setAttribute('class','val');
        skillVal.innerText = skill.progress + '%';
        skillTex.appendChild(skillVal);

        let skillProgWrap = document.createElement('div');
        skillProgWrap.setAttribute('class','progress-bar-wrap');
        progDiv.appendChild(skillProgWrap);

        let progBar = document.createElement('div');
        progBar.setAttribute('class','progress-bar');
        progBar.setAttribute('role','progressbar');
        progBar.setAttribute('aria-valuenow',skill.progress);
        progBar.setAttribute('aria-valuemin','0');
        progBar.setAttribute('aria-valuemax','100');
        skillProgWrap.appendChild(progBar);
      };

      let skillHolder = select('.skills-content');
      skillObj.forEach(skill => {
        insertSkill(skill,skillHolder);
      });
    };

    let jsonDump = (jsonObj) => {
      
      let aboutObj = jsonObj.About;
      aboutDump(aboutObj);

      let skillObj = jsonObj.Skills;
      skillDump(skillObj);

    };

})()