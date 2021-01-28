import React from 'react';

function QuizePage (props){
    return(
        <div className="mx-md-5 px-md-5">

        <div className="container-fluid rTOl text-right px-md-5 rounded-lg" >
          <div className="mx-md-5">
          <div className=" row no-gutters position-relative shadow color1 table-borderless my-1 mx-md-5 rounded-lg" style={{fontSize:16}}>
            <div className="col-md-4 mb-md-0 p-4 rounded-lg" >
            <div class="container my-4">

  <p class="font-weight-bold"></p>

  <p><strong>Detailed documentation and more examples you can find in our <a href="https://mdbootstrap.com/docs/standard/forms/checkbox/"
                                                                             target="_blank">Bootstrap Checkbox Docs</a></strong> </p>

  <hr/>

  <p class="font-weight-bold text-right">سوال اول این است که؟ </p>

  <ul class="list-group list-group-flush">
  <div class="form-check">
  <input class="form-check-input" type="radio" name="flexRadioDisabled" id="flexRadioDisabled"/>
  <label class="form-check-label pr-5" for="flexRadioDisabled">
   داستایوفسکی
  </label>
</div>  
    <div class="form-check">
  <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault"/>
  <label class="form-check-label pr-5" for="flexCheckDefault">
    داستایوفسکی
  </label>
</div>
<div class="form-check">
  <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault"/>
  <label class="form-check-label pr-5" for="flexCheckDefault">
    kjmzskl
  </label>
</div> <div class="form-check">
  <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault"/>
  <label class="form-check-label pr-5" for="flexCheckDefault">
    داستایوفسکی
  </label>
</div>
  </ul>

                </div>
                </div>
                </div>
                </div>
                </div>
                </div>
    )
}

export default QuizePage;