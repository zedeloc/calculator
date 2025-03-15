# calculator
Calculator assignment from The Odin Project - Foundations

Upon nearly finishing the whole project (see .index-old.js), I chose to switch 
to an all strings workflow, where most of everything is achieved through manipulating 
strings, rather than using Objects like Arrays. This seems to go against the assignment 
guidelines that imply storing the first and second numbers separately. Instead, 
the whole expression is a single string limited by a bunch of logical statements 
to prevent illegal inputs. This string is then split into an array at the last minute
and placed into the operate() function to produce an answer. This reduced a lot of
converting to and from arrays that I was doing in the previous attempt.

Sorry, Odin. After basically finishing the original approach, the string solution 
seemed more elegant and interesting to me.

Features:

-Backspace
-Operands with decimals
-Negative operands
-Change operand in place
-Keyboard support
-Rounds to 5 decimal places