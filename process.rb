#!/usr/bin/env ruby

Dir['*.dot'].each do |dotfile|
  `dot -Tpdf -o images/#{dotfile.split('.').first}.pdf #{dotfile}`
end

system "rstakeout 'xelatex -shell-escape roca' roca.tex"
