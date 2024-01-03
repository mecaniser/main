import random

computer_choice = random.choice(['rock','paper','scissors'])

user_choice = int(input('Choose Rock, Paper or Scissors'))

if user_choice == computer_choice:
  print('TIE')
elif user_choice == 'rock' and  computer_choice == 'scissors':
  print("You Win")
elif user_choice == 'scissors' and  computer_choice == 'paper':
  print("You Win")
elif user_choice == 'paper' and  computer_choice == 'rock':
  print("You Win")
else:
  print('Computer choice ' + computer_choice + ' you lost')
