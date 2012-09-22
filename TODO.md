# Current Task
## Related View
- Refactor each related result into its own view. Use DefinitionView as a single related Item view. 
- Refactor ChordDefinitionView -> DefinitionView
- Move event binding out of initialization mathod. Into a function or even out of the DefinitionView

# UI


##  INTERVAL / NOTE SWITCH
### Will set application state to display note names (A-G) or interval names (1/R, m3, M3, etc.)

    Find the proper place for the switch state
    is it a part of the Definition view?
    should it be in a more generic module such as the router
    or a specialized module for app state maybe as a constant?

- Note Selector
- Scale / Chord Switch
- Free form mode (turn intervals on to create custom chords) (?)
- Save & Share Options
- Sound


# ISSUES:




# Definition View
- Sound (?)

# Note Dictionary
- Smart Vs Hard Coded ??? - MAYBE NOT - Maybe V2

# Design
- design UI elements
- consider bootstrap for autocomplete, modal and popover components
- create interval font(?)