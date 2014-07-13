/*
 * Copyright 2014 Stephan Knitelius.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
package com.knitelius.example.JSFElementFocus;

import java.io.Serializable;
import javax.enterprise.context.SessionScoped;
import javax.inject.Named;

/**
 *
 * @author Stephan Knitelius <stephan@knitelius.com>
 */
@Named
@SessionScoped
public class SessionBean implements Serializable {

    private String firstValue;
    private String secondValue;
    private String thirdValue;

    public String getThirdValue() {
        return thirdValue;
    }

    public void setThirdValue(String thirdValue) {
        this.thirdValue = thirdValue;
    }

    public String getFirstValue() {
        return firstValue;
    }

    public void setFirstValue(String firstValue) throws InterruptedException {
        Thread.sleep(2400);
        this.firstValue = firstValue;
        this.secondValue = firstValue != null ? firstValue.toUpperCase() : "";
        this.thirdValue = "thirdValue".concat(firstValue);
    }

    public String getSecondValue() {
        return secondValue;
    }

    public void setSecondValue(String secondValue) {
        this.secondValue = secondValue;
    }

}
