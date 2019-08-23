(window["webpackJsonpshot-timer"]=window["webpackJsonpshot-timer"]||[]).push([[0],[,,,,,,,,,,,,,function(e,t,n){e.exports=n(26)},,,,,function(e,t,n){},function(e,t,n){},,function(e,t,n){},function(e,t,n){},function(e,t,n){},function(e,t,n){},function(e,t,n){},function(e,t,n){"use strict";n.r(t);var a=n(0),i=n.n(a),r=n(11),o=n.n(r),l=(n(18),n(1)),c=n(2),s=n(5),u=n(3),h=n(4),d=(n(19),n(6)),m={STAGE_PRIVILEGES:"privileges",STAGE_CALIBRATION:"calibration",STAGE_TIMER:"timer"},v=Object(a.createContext)({stage:m.STAGE_PRIVILEGES,changeStage:function(e){}}),p=function(e){function t(e){var n;return Object(l.a)(this,t),(n=Object(s.a)(this,Object(u.a)(t).call(this,e))).state={stage:m.STAGE_PRIVILEGES,changeStage:n.changeStage},n.state.changeStage=n.changeStage.bind(Object(d.a)(n)),n}return Object(h.a)(t,e),Object(c.a)(t,[{key:"changeStage",value:function(e){this.setState({stage:e})}},{key:"render",value:function(){return i.a.createElement(v.Provider,{value:this.state},this.props.children)}}]),t}(i.a.Component);v.Controller=p;var f=v,g=n(9),E=n(7),b=n.n(E),y=n(8),S=new(function(){function e(){Object(l.a)(this,e),this.audioContext=null,this.inputDevice=null,this.listeners={},this.error=!1}return Object(c.a)(e,[{key:"emit",value:function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:null;this.listeners[e]&&this.listeners[e].forEach(function(e){"function"===typeof e&&e(t)})}},{key:"on",value:function(e,t){this.listeners[e]||(this.listeners[e]=[]),this.listeners[e].push(t)}},{key:"removeListener",value:function(e,t){if(this.listeners[e]){var n=this.listeners[e].findIndex(function(e){return e===t});-1!==n&&this.listeners[e].splice(n,1)}}},{key:"init",value:function(){if(this.audioContext=new AudioContext,navigator.getUserMedia=navigator.getUserMedia||navigator.webkitGetUserMedia||navigator.mozGetUserMedia||navigator.msGetUserMedia,!navigator.getUserMedia)throw this.error=!0,new Error("UserMedia API not available!")}},{key:"getAvailableInputDevices",value:function(){return new Promise(function(e,t){navigator.mediaDevices.enumerateDevices().then(function(t){e(t.filter(function(e){return"audioinput"===e.kind}))}).catch(t)})}},{key:"selectDevice",value:function(e){this.inputDevice=e}},{key:"listen",value:function(){var e=this;return new Promise(function(t,n){e.inputDevice||n("No device selected!");var a={audio:{deviceId:e.inputDevice}};navigator.getUserMedia(a,function(n){e.initialiseMicrophoneServices(n),t()},function(e){n(e)})})}},{key:"initialiseMicrophoneServices",value:function(e){var t=this.audioContext.createMediaStreamSource(e),n=this.createAudioMeter(this.audioContext);t.connect(n)}},{key:"createAudioMeter",value:function(e){var t=this,n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:.98,a=arguments.length>2&&void 0!==arguments[2]?arguments[2]:.95,i=arguments.length>3&&void 0!==arguments[3]?arguments[3]:750,r=e.createScriptProcessor(512);return r.onaudioprocess=function(e){t.volumeAudioProcess(e,r),t.onAudioProcess(e,r)},r.clipping=!1,r.lastClip=0,r.volume=0,r.clipLevel=n,r.averaging=a,r.clipLag=i,r.connect(e.destination),r.checkClipping=function(){return!!this.clipping&&(this.lastClip+this.clipLag<window.performance.now()&&(this.clipping=!1),this.clipping)},r.shutdown=function(){this.disconnect(),this.onaudioprocess=null},r}},{key:"onAudioProcess",value:function(e,t){this.emit("audio-process",{event:e,processor:t})}},{key:"volumeAudioProcess",value:function(e,t){for(var n,a=e.inputBuffer.getChannelData(0),i=a.length,r=0,o=0;o<i;o++)n=a[o],Math.abs(n)>=t.clipLevel&&(t.clipping=!0,t.lastClip=window.performance.now()),r+=n*n;var l=Math.sqrt(r/i),c=Math.max(l,t.volume*t.averaging);if(t.volume!==c){t.volume=c;var s=Math.min(Math.round(100*c),100);s!==this.volume&&(this.volume=s,this.emit("volume-change",this.volume))}}}]),e}());n(21);var k=function(e){var t=e.volume,n=e.peak,a=e.threshold;return i.a.createElement("div",{className:"volume-display"},i.a.createElement("div",{className:"bar",style:{width:"".concat(t,"%")}}),n&&i.a.createElement("div",{className:"peak-indicator"}),a&&i.a.createElement("div",{className:"threshold-indicator",style:{width:"".concat(a,"%")}}))},C=function(e){function t(){var e,n;Object(l.a)(this,t);for(var a=arguments.length,i=new Array(a),r=0;r<a;r++)i[r]=arguments[r];return(n=Object(s.a)(this,(e=Object(u.a)(t)).call.apply(e,[this].concat(i)))).state={availableDevices:[]},n}return Object(h.a)(t,e),Object(c.a)(t,[{key:"componentDidMount",value:function(){var e=Object(y.a)(b.a.mark(function e(){var t;return b.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,S.getAvailableInputDevices();case 2:t=e.sent,this.setState({availableDevices:t});case 4:case"end":return e.stop()}},e,this)}));return function(){return e.apply(this,arguments)}}()},{key:"render",value:function(){return i.a.createElement("select",{value:this.props.value,onChange:this.props.onChange},i.a.createElement("option",{value:null},"Select..."),this.state.availableDevices.map(function(e,t){return i.a.createElement("option",{value:e.deviceId,key:e.deviceId},e.label||"Unknown device #".concat(t+1))}))}}]),t}(i.a.Component);n(22);var O=function(e){var t=e.children,n=e.id;return i.a.createElement("div",{className:"stage-wrapper",id:"stage-".concat(n)},t)},w=(n(23),function(e){function t(e){var n;return Object(l.a)(this,t),(n=Object(s.a)(this,Object(u.a)(t).call(this,e))).state={error:!1,goodToProceed:!1,clickedStart:!1,selectedDevice:"",volume:0},n.handleVolumeChange=n.handleVolumeChange.bind(Object(d.a)(n)),n}return Object(h.a)(t,e),Object(c.a)(t,[{key:"componentDidMount",value:function(){var e=Object(y.a)(b.a.mark(function e(){return b.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:S.error&&(console.error("MicrophoneService failed to load"),this.setState({error:!0}));case 1:case"end":return e.stop()}},e,this)}));return function(){return e.apply(this,arguments)}}()},{key:"init",value:function(){var e=Object(y.a)(b.a.mark(function e(){var t;return b.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,S.init(),e.next=4,S.getAvailableInputDevices();case 4:if((t=e.sent)&&t.length){e.next=8;break}return console.log("No devices found!"),e.abrupt("return",this.setState({error:!0}));case 8:return S.selectDevice(this.state.selectedDevice),S.on("volume-change",this.handleVolumeChange),e.next=12,S.listen();case 12:this.setState({goodToProceed:!0}),e.next=19;break;case 15:e.prev=15,e.t0=e.catch(0),console.log(e.t0),this.setState({error:!0});case 19:case"end":return e.stop()}},e,this,[[0,15]])}));return function(){return e.apply(this,arguments)}}()},{key:"componentWillUnmount",value:function(){S.removeListener("volume-change",this.handleVolumeChange)}},{key:"handleVolumeChange",value:function(e){this.setState({volume:e})}},{key:"handleClickedStart",value:function(){this.setState({clickedStart:!0}),this.init()}},{key:"handleProceed",value:function(){this.props.changeStage(m.STAGE_CALIBRATION)}},{key:"handleDeviceChange",value:function(e){var t=e.target.value;this.setState({selectedDevice:t})}},{key:"render",value:function(){return i.a.createElement(O,{id:"privileges"},this.state.error?i.a.createElement("div",{className:"error"},i.a.createElement("p",null,"An error occured."),i.a.createElement("p",null,"Looks like your browser doesn't support our core features (or you didn't grant us access).")):i.a.createElement("div",null,this.state.goodToProceed?i.a.createElement("div",{className:"current-read"},i.a.createElement("h2",null,"Current microphone read:"),i.a.createElement(k,{volume:this.state.volume}),i.a.createElement("h4",null,"All good?"),i.a.createElement("p",null,"(If not, it might be worth reloading the page and picking a different device)"),i.a.createElement("button",{onClick:this.handleProceed.bind(this),className:"btn"},"PROCEED")):i.a.createElement("div",{className:"access-request"},this.state.clickedStart?i.a.createElement(i.a.Fragment,null,i.a.createElement("p",null,"Waiting for access to microphone...")):i.a.createElement(i.a.Fragment,null,i.a.createElement("h4",null,"We need access to your microphone ",i.a.createElement("i",null,"(duh...)")),this.state.selectedDevice?i.a.createElement(i.a.Fragment,null,i.a.createElement("p",null,"Now click the button below to start."),i.a.createElement("p",null,i.a.createElement("button",{onClick:this.handleClickedStart.bind(this),className:"btn"},"START"))):i.a.createElement(i.a.Fragment,null,i.a.createElement("p",null,"First, please select the microphone you'd like to use:"),i.a.createElement(C,{value:this.state.selectedDevice,onChange:this.handleDeviceChange.bind(this)}))))))}}]),t}(i.a.Component)),I=n(12);n(24);var j,A=function(e){var t=e.values;return i.a.createElement("div",{className:"equalizer-display"},t.map(function(e){return i.a.createElement("div",{className:"inner",style:{height:"".concat(Math.round(100-100*e),"px")}})}))},N=(n(25),{NEW_PROFILE:"new-profile",SELECT_PROFILES:"select-profiles"}),P={STANDBY:"standby",LISTENING:"listening"},D=function(e){function t(e){var n;return Object(l.a)(this,t),(n=Object(s.a)(this,Object(u.a)(t).call(this,e))).state={volume:S.volume,threshold:45,profiles:[],selectedProfiles:[],mode:N.NEW_PROFILE,captureMode:P.STANDBY,recentCapturedSample:null},n.handleVolumeChange=n.handleVolumeChange.bind(Object(d.a)(n)),n.handleThresholdChange=n.handleThresholdChange.bind(Object(d.a)(n)),n.handleAudioProcess=n.handleAudioProcess.bind(Object(d.a)(n)),n}return Object(h.a)(t,e),Object(c.a)(t,[{key:"componentDidMount",value:function(){this.loadCalibrationData(),this.initMicrophoneService()}},{key:"componentWillUnmount",value:function(){S.removeListener("volume-change",this.handleVolumeChange),S.removeListener("audio-process",this.handleAudioProcess)}},{key:"initMicrophoneService",value:function(){S.on("volume-change",this.handleVolumeChange),S.on("audio-process",this.handleAudioProcess)}},{key:"loadCalibrationData",value:function(){var e=localStorage.getItem("calibration");if(e){try{e=JSON.parse(e)}catch(t){return console.error(t),void localStorage.removeItem("calibration")}e.profiles&&e.profiles.length&&this.setState({mode:N.SELECT_PROFILES,profiles:e.profiles,threshold:e.threshold||this.state.threshold})}}},{key:"handleVolumeChange",value:function(e){this.setState({volume:e})}},{key:"handleAudioProcess",value:function(e){var t=e.event;e.processor;if(this.state.mode===N.NEW_PROFILE)if(S.volume>=this.state.threshold){if(console.log("ABOVE THRESHOLD"),this.state.captureMode===P.STANDBY){var n=Array.from(t.inputBuffer.getChannelData(0));console.log("UPDATING SAMPLE"),this.setState({captureMode:P.LISTENING,recentCapturedSample:n})}}else this.state.captureMode===P.LISTENING&&this.setState({captureMode:P.STANDBY})}},{key:"handleThresholdChange",value:function(e){this.setState({threshold:e.target.value})}},{key:"handleNewProfileSubmit",value:function(){var e=this.state.recentCapturedSample.reduce(function(e,t,n){return t>.4?[].concat(Object(I.a)(e),[n]):e},[]);console.log(e)}},{key:"render",value:function(){return i.a.createElement(O,{id:"calibration"},this.state.mode===N.NEW_PROFILE?i.a.createElement(i.a.Fragment,null,i.a.createElement("h2",null,"Let's create ",this.state.profiles.length?"another":"your first"," profile"),i.a.createElement("p",null,i.a.createElement("strong",null,"Profile")," is basically a set of information I collect about the sound of your firearm",i.a.createElement("br",null),"so that we can identify it better (otherwise I'll just pick up background noise as shots)."),i.a.createElement("p",null,"I really think you should create ",i.a.createElement("strong",null,"1 profile per every gun you use")," in your excercises,",i.a.createElement("br",null),"although I can't promise I will always differentiate between them correctly."),i.a.createElement("h3",null,"First, let's adjust the volume threshold"),i.a.createElement("p",null,"Try placing a few shots and adjusting the value below to make sure I pick up shots only."),i.a.createElement("p",null,"Also, for best results, keep your phone exactly where you'll have it during shooting."),i.a.createElement("div",{className:"threshold-regulation"},i.a.createElement("div",{className:"threshold-range-input"},i.a.createElement("input",{type:"range",min:"0",max:"100",step:"1",value:this.state.threshold,onChange:this.handleThresholdChange})),i.a.createElement(k,{volume:this.state.volume,threshold:this.state.threshold})),this.state.recentCapturedSample&&i.a.createElement(i.a.Fragment,null,i.a.createElement(A,{values:this.state.recentCapturedSample.slice(127,383)}),i.a.createElement("p",null,'If it looks right, name this profile and press "Continue".'),i.a.createElement("input",{type:"text",placeholder:"Profile name..."}),i.a.createElement("br",null),i.a.createElement("button",{className:"btn",onClick:this.handleNewProfileSubmit.bind(this)},"CONTINUE"))):i.a.createElement(i.a.Fragment,null))}}]),t}(i.a.Component),T=(j={},Object(g.a)(j,m.STAGE_CALIBRATION,D),Object(g.a)(j,m.STAGE_PRIVILEGES,w),j),M=function(e){function t(){return Object(l.a)(this,t),Object(s.a)(this,Object(u.a)(t).apply(this,arguments))}return Object(h.a)(t,e),Object(c.a)(t,[{key:"render",value:function(){return i.a.createElement(f.Consumer,null,function(e){return i.a.createElement(T[e.stage],e)})}}]),t}(i.a.Component),L=function(e){function t(){return Object(l.a)(this,t),Object(s.a)(this,Object(u.a)(t).apply(this,arguments))}return Object(h.a)(t,e),Object(c.a)(t,[{key:"render",value:function(){return i.a.createElement(f.Controller,null,i.a.createElement("div",{className:"App"},i.a.createElement("div",{id:"main"},i.a.createElement(M,null))))}}]),t}(i.a.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));o.a.render(i.a.createElement(L,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})}],[[13,1,2]]]);
//# sourceMappingURL=main.71d52b0c.chunk.js.map