package jp.co.acroquest.endosnipe.web.dashboard.controller;

import java.util.Locale;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller
public class PrototypeController {

    /**
     * Simply selects the home view to render by returning its name.
     */
    @RequestMapping(value = "/Prototype", method = RequestMethod.GET)
    public String initialize(Locale locale, Model model)
    {
        // BackbonePrototype1.jspに遷移する。
        return "Prototype";
    }
}
