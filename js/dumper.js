/*
  Custom script to create site content dynamically from json file for easier updation by client without having to change the code.
  Author: XenonyxBlaze (Aarav Rajput)
*/
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

    const typedDump = (typedObj) => {
      let typedEl = select('.typed');
      let typedStr = typedObj.join(' , ');
      console.log(typedStr);
      typedEl.setAttribute('data-typed-items',typedStr)
    };

    const linkDump = (linksObj) => {
      let linkHolders = select('.social-links',true);
      linkHolders.forEach(linkHolder => {        
        linksObj.forEach(link => {
          let linkEl = document.createElement('a');
          linkEl.setAttribute('href',link.url);
          linkEl.setAttribute('target','_blank');
          linkEl.setAttribute('class',link.Name);
          linkHolder.appendChild(linkEl);

          let linkIcon = document.createElement('i');
          linkIcon.setAttribute('class','bi bi-' + link.Name);
          linkEl.appendChild(linkIcon);
        });

      });
    };

    const resumeDump = (resumeObj) => {
      let resumeHolder = select('#resume-dynamic');
      
      resumeObj.forEach(itemLis => {
        itemLis.forEach(item => {
          console.log(item)
          let itemEl = document.createElement('div');
          itemEl.setAttribute('class','resume-item');
          resumeHolder.appendChild(itemEl);

          let orgEl = document.createElement('h4');
          orgEl.innerText = item.org;
          itemEl.appendChild(orgEl);

          let dateEl = document.createElement('h5');
          dateEl.innerText = item.period;
          itemEl.appendChild(dateEl);
    
          let descEl = document.createElement('p');
          itemEl.appendChild(descEl);

          let posEl = document.createElement('em');
          posEl.innerText = item.pos;
          descEl.appendChild(posEl);

          let briefEl = document.createElement('p');
          briefEl.innerText = item.brief;
          itemEl.appendChild(briefEl);
        });
        resumeHolder.appendChild(document.createElement('br'));
      });
    }

    const actualProjDump = (project,domain) => {
      let projectMain = select('#projects .container .row ');

      let projectHolder = document.createElement('div');
      projectHolder.setAttribute('class','col-lg-3 col-md-6 col-sm-12 mt-1');
      projectMain.appendChild(projectHolder);

      let projectEl = document.createElement('div');
        projectEl.setAttribute('class','card');
        projectHolder.appendChild(projectEl);

        let projectHeader = document.createElement('div');
        projectHeader.setAttribute('class','card-header');
        projectEl.appendChild(projectHeader);

        switch (domain) {
          case 'ANN':
            let projectIcon = document.createElement('i');
            projectIcon.setAttribute('class','bi bi-robot');
            projectHeader.appendChild(projectIcon);
            break;
          case 'ml':
            let projectIcon2 = document.createElement('i');
            projectIcon2.setAttribute('class','bi bi-cpu');
            projectHeader.appendChild(projectIcon2);
            break;
          case 'cv':
            let projectIcon3 = document.createElement('i');
            projectIcon3.setAttribute('class','bi bi-eye');
            projectHeader.appendChild(projectIcon3);
            break;
          case 'nlp':
            let projectIcon4 = document.createElement('i');
            projectIcon4.setAttribute('class','bi bi-chat-right-text');
            projectHeader.appendChild(projectIcon4);
            break;
        }

        if (project.img) {
          let projectImg = document.createElement('img');
          projectImg.setAttribute('src',project.img);
          projectImg.setAttribute('class','card-img-top');
          projectEl.appendChild(projectImg);
        }

        let projectBody = document.createElement('div');
        projectBody.setAttribute('class','card-body');
        projectEl.appendChild(projectBody);

        let projectTitle = document.createElement('h3');
        projectTitle.setAttribute('class','card-title');
        projectTitle.innerText = project.title;
        projectBody.appendChild(projectTitle);

        let projectDesc = document.createElement('p');
        projectDesc.setAttribute('class','card-text');
        projectDesc.innerText = project.desc;
        projectBody.appendChild(projectDesc);

        let projectLink = document.createElement('a');
        projectLink.setAttribute('href',project.url);
        projectLink.setAttribute('target','_blank');
        projectLink.setAttribute('class','btn btn-danger');
        projectLink.innerHTML = '<i class="bi bi-github"></i>Visit repository';
        projectBody.appendChild(projectLink);

    }

    const projectDump = (projectObj,d) => {
      let projectHolder = select('#projects .container .row');
      while(projectHolder.lastChild) {
        projectHolder.removeChild(projectHolder.lastChild);
      }
      switch (d) {
        case 'all':
          projectObj.forEach(dom => {
            dom.projects.forEach(project => {
              actualProjDump(project,dom.domain);
            });
          });
          break;
        case 'ANN':
          projectObj.forEach(dom => {
            if (dom.domain == 'ANN'){
              dom.projects.forEach(project => {
                actualProjDump(project,dom.domain);
              });
            }
          });
          break;
        case 'ml':
          projectObj.forEach(dom => {
            if (dom.domain == 'ml'){
              dom.projects.forEach(project => {
                actualProjDump(project,dom.domain);
              });
            }
          });
          break;
        case 'cv':
          projectObj.forEach(dom => {
            if (dom.domain == 'cv'){
              dom.projects.forEach(project => {
                actualProjDump(project,dom.domain);
              });
            }
          });
          break;
        case 'nlp':
          projectObj.forEach(dom => {
            if (dom.domain == 'nlp'){
              dom.projects.forEach(project => {
                actualProjDump(project,dom.domain);
              });
            }
          });
          break;
        case 'm':
          
          async function fetchReadme(){
            let moreHero = document.createElement('div');
            moreHero.setAttribute('class','card');
            let converter = new showdown.Converter();
            converter.setOption('tables',true);
            converter.setOption('tablesHeaderId',true);
            let readme = await ((await fetch('https://raw.githubusercontent.com/vaasu2002/PROJECTS/main/README.md')).text());
            let moreHeroText = converter.makeHtml(readme);
            moreHero.innerHTML = moreHeroText;
            projectHolder.appendChild(moreHero);
          }

          fetchReadme();

          break;
      }
    }

    let jsonDump = (jsonObj) => {

      let typedObj = jsonObj.Typed;
      typedDump(typedObj);
      
      let linksObj = jsonObj.Links;
      linkDump(linksObj);

      let aboutObj = jsonObj.About;
      aboutDump(aboutObj);

      let skillObj = jsonObj.Skills;
      skillDump(skillObj);

      let resumeObj = jsonObj.Resume;
      resumeDump(resumeObj);

      let projectObj = jsonObj.Projects;
      projectDump(projectObj,'all');

    };


    async function updateProjects(d) {
      let jsonFetchAgain = await ((await fetch("js/info.json")).text());
      let jsonRespObj = JSON.parse(jsonFetchAgain);
      let projectObj = jsonRespObj.Projects;

      let projBtns = select('.projSelect',true);
      
      projBtns.forEach(btn => {
        btn.classList.remove('active');
        let projCheck = btn.getAttribute('id');
        if (projCheck == d) {
          btn.classList.add('active');
          projectDump(projectObj,d);
        }
      });
    };
